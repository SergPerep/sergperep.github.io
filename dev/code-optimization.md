# Code optimization

Simple ways to improve C# .NET code speed.

> Not everything needs optimization

> Trade-off between optimization and readability

# Avoid chaining collection extension methods

A single LINQ extension method iterates over a collection once. However, chaining multiple LINQ methods can result in multiple iterations, which increases processing time. You can get better performance if you rewrite a chain of collection methods into a single `foreach` loop.

> Keep in mind that although `foreach` will always outperform a chain of LINQ methods, LINQ has become more efficient in recent .NET versions - making the gains from this kind of optimization less impressive.

Imagine you have the birth records of a specific hospital, and you want to find out which names parents were choosing for girls in September 2024.

```c#
// Before optimization
List<string> septemberNames = births
    .Where(b => b.sex == Sex.Female && b.date.Year == 2024 && b.date.Month == 9)
    .Select(b => b.name)
    .Distinct()
    .OrderBy(name => name)
    .ToList();
```
The same solution can be rewritten using a `foreach` loop.

```c#
// After optimization
List<string> septemberNames = new();
HashSet<string> seen = new();
foreach (Birth b in births)
{
    if (b.sex != Sex.Female || b.date.Year != 2024 || b.date.Month != 9)
        continue;
    if (seen.Add(b.name)) uniqueNames.Add(b.name);
}
septemberNames.Sort();
```

[Benchmarking these operations](https://github.com/SergPerep/benchmarks_dotnet) with 1 million births shows the following results:

```plain text
| Method            | Mean     | Error     | StdDev    |
|------------------ |---------:|----------:|----------:|
| WithExtMethods    | 8.436 ms | 0.0585 ms | 0.0488 ms |
| WithoutExtMethods | 7.172 ms | 0.0726 ms | 0.0606 ms |
```

While the gains have become more modest in recent .NET versions, the benefits of optimization continue to grow as collection size and operation complexity increase.

# Use `Dictionary` for frequent search

Dictionaries are great for quick lookups, especially when they are frequent. If you often need to search for a value, consider storing the data in a `Dictionary` instead of an `Array` or a `List`.

Let's recall our collection of birth records. We want to retrieve the records of girls born in September 2025.

```c#
// Before optimization
Birth[] septemberNames = births
    .Where(b => b.sex == Sex.Female && b.date.Year == 2024 && b.date.Month == 9)
    .ToArray();
```
If we decide to store the data in a `birthsPerYear` `Dictionary`, where the key is a year and the value is a list of births for that year, we get the following:

```c#
// After optimization
Birth[] septemberNames = birthsPerYear[2024].
    .Where(b => b.sex == Sex.Female && b.date.Month == 9)
    .ToArray();
```

[Benchmarking these operations](https://github.com/SergPerep/benchmarks_dotnet) with 1 million births shows the following results:

```plain text
| Method              | Mean      | Error     | StdDev    |
|-------------------- |----------:|----------:|----------:|
| IterateCollection   | 10.783 ms | 0.1885 ms | 0.1764 ms |
| SearchViaDictionary |  3.939 ms | 0.0501 ms | 0.0444 ms |
```

As you can see, searching using a `Dictionary` is very efficient. Of course, it makes no sense to build the `Dictionary` every time you want to search. But if you know that searching will be frequent, consider storing the dataset in a `Dictionary`.

# Avoid string concationation

When you concatinate two strings using `+` operator, the following is happening:

1. Memory is allocated for the resulting string. Its size equals the combined length of the originals. 
2. Characters from each string are copied into the new space.

The bottom line is the longer the original strings, the slower the concatenation.

Concatenating strings once or twice is fine. But doing it repeatedly - especially in loops - can lead to excessive memory allocations, which may cause garbage collection overhead and slow down your application.

Imagine we have a list of food items along with their nutritional values. This list is stored in memory, and we want to generate SQL `INSERT` queries to add this data to a database.

```c#
// Before optimization
string insertQueries = "";
foreach (Food foodItem in foods)
{
    insertQueries += $"\nINSERT INTO foods (name, protein, carbs, fat) VALUES ('{foodItem.name}', {foodItem.protein}, {foodItem.carbs}, {foodItem.fat});";
}
```
```c#
// After optimization
StringBuilder sb = new("");
foreach (Food foodItem in foods)
{
    sb.Append($"\nINSERT INTO foods (name, protein, carbs, fat) VALUES ('{foodItem.name}', {foodItem.protein}, {foodItem.carbs}, {foodItem.fat});");
}

string insertQueries = sb.ToString();
```

# Insert item without re-sorting the collection

Imagine that you have sorted collection into which you want to insert new item. To preserve the order, now you need to re-sort the collection.

```c#
// Before optimization
List<string> euCountries = new(_dataset_2012); // sorted
euCountries.Add("Croatia"); // Croatia joined EU in 2013
euCountries.Sort();
```

Sorting is an expensive `O(n log n)` operation, so it's better to avoid re-sorting. Instead, we can insert the new item in the correct position using binary search.

```c#
// After optimization with binary search
List<string> euCountries = new(_dataset_2012); // sorted
string item = "Croatia"; // Croatia joined EU in 2013
int index = euCountries.BinarySearch(item);
if (index < 0) index = ~index;
euCountries.Insert(index, "Croatia");
```
Another approach is to use a `SortedSet` instead of a `List`, as it automatically maintains sorted order when items are added. 

```c#
// After optimization with SortedSet
SortedSet<string> euCountries = new(_dataset_2012); // sorted
euContries.Add("Croatia"); // Croatia joined EU in 2013
```


[Benchmarking similar operations](https://github.com/SergPerep/benchmarks_dotnet) with 1 million items shows the following results:

```plain text
| Method                    | Mean            | Error         | StdDev        |
|-------------------------- |----------------:|--------------:|--------------:|
| WithResort                | 3,745,282.12 us | 23,668.768 us | 20,981.746 us |
| WithBinarySearchAndInsert |     5,204.01 us |    102.536 us |    225.069 us |
| WithSortedSet             |        42.60 us |      1.166 us |      3.211 us |
```

As you can see, SortedSet is incredibly fast. However, building a SortedSet has more overhead compared to a List, which can negate its potential performance gains. Also, SortedSet does not allow duplicates. That said, it can still be more efficient than performing a full sort twice.

The rule of thumb here is if you have a collection that always must be sorted, does not allow duplicates and insertion is frequent 

Inserting the item into the right place in the `List` is `O(n)` operation, which is still more efficient than re-sorting.





Thus, `SortedSet` is optimal for cases where: 

- Duplicates are disallowed
- Insertions are frequent
- The collection must remain sorted at all times.

# Iterating `Array` vs `List`

When it comes to iteration, an `Array` always out-performs a `List`, though by an unimpressive margin. Choosing an array can help squeeze out a bit of extra performance, but will not be the main focus of optimization.

It's also worth noting that arrays and lists aren't always interchangeable - you likely wouldn't choose an `Array` if you need a flexible, dynamically-sized collection.

But imagine having a collection of last month's personal bank transactions. To get the total amount of money you've spent this month, you have to iterate over the collection - whether it's an `Array` or a `List`. 

```c#
// Iterating array
int totalAmount = 0;
foreach (Transaction tr in transactionArray)
    totalAmount += tr.amount;

// Iterating list
int totalAmount = 0;
foreach (Transaction tr in transactionList)
    totalAmount += tr.amount;

```
[Benchmark these operations](https://github.com/SergPerep/benchmarks_dotnet) with 1 million items in a collection, and you get the following results:

```plain text
| Method           | Mean     | Error     | StdDev    |
|----------------- |---------:|----------:|----------:|
| TotalAmountArray | 7.033 ms | 0.0704 ms | 0.0588 ms |
| TotalAmountList  | 7.607 ms | 0.0642 ms | 0.0600 ms |
```

As you can see, the array is faster - but whether the performance gain is worth the extra effort is up to you.

# Multitasking

This is the last point, because it’s obvious. If you are waiting for api response or reading/writing a file, don’t just waste your time, do something else meanwhile. Use Tasks and asynchronous methods.