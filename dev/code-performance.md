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

# Avoid string modifications

When you add two strings:

1. Memory is allocated for the resulting string. Its size equals the combined length of the originals. 
2. Characters from each string are copied into the new space.

**The bottom line:** the longer the original strings, the slower the concatenation.

If you concat a string once or twice - it is fine. But when you do this many times within a short period of time you are risking overload the memory, which will create noticable delay.

Consider this:

```c#
string insertQueries = "";
foreach (Food foodItem in foods)
{
    insertQueries += $"\nINSERT INTO foods (name, protein, carbs, fat) VALUES ('{foodItem.name}', {foodItem.protein}, {foodItem.carbs}, {foodItem.fat});"
}
```
```c#
StringBuilder sb = new("");
foreach (Food foodItem in foods)
{
    sb.Apped($"\nINSERT INTO foods (name, protein, carbs, fat) VALUES ('{foodItem.name}', {foodItem.protein}, {foodItem.carbs}, {foodItem.fat});");
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

Instead of re-sorting we can insert the new item in the right place using binary search.

```c#
// After optimization
List<string> euCountries = new(_dataset_2012); // sorted
string item = "Croatia"; // Croatia joined EU in 2013
int index = euCountries.BinarySearch(item);
if (index < 0) index = ~index;
euCountries.Insert(index, "Croatia");
```

There is `SortedSet<T>` that automatically sorts when item is added. But building the it takes extra in comparison to the `List<T>`, which negates the perfomance win that it could have potentially provide. Though it is still more performative than double sort.

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