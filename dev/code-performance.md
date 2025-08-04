# Code optimization

Simple ways to improve C# .NET code speed.

# Avoid chaining collection extension methods

A single LINQ extension method iterates a collection one time. A chain of LINQ extension methods iterates collections multiple times. This increases processing time. 

Let's say we have a collection of  1,025 pockemons, 159 of which are of water type. And we want to get the collection of water type pockemons.

```c#

// Before optimisation
List<string> waterPockemonNames = pockemons
    .Where(p => p.Types.Contains("Water")) // Iterates through 1025 items
    .Select(p => p.Name) // Iterates through 159 items
    .ToList() // Iterates through = 159 items

```
To optimise and save time - combine high-level functions into a single for-loop, which will iterate the collection a single time.

```c#

// After optimization
List<string> waterPokemonNames = new List<string>();

foreach (Pockemon p in pockemons) // Iterates through 1025 items
{
    if(p.Types.Contains("Water"))
    {
        waterPockemonNames.Add(p.Name)
    }
}
    
```

A `foreach` loop always out-performs a chain of extension methods - but up to what point?

LINQ extension methods became more performative in later .net versions. Which makes results of the optimisation less impressive.  

Still the benefit of the optimisation grows with the size of collections and complexity of filtering and modification.

## `Distinct()` into `foreach` loop 

Some high-level functions are easily convertable into a `foreach` loop such as `.Where()`, `Select()`, `ToArray()`, `ToList()` and `ToDictionary()`.

Doing the same for `Distinct()` can be a bit tricky. But here is a shortcut:

```c#
List<string> uniqueNames;

// Before optimization
uniqueNames = births
    .Select(b => b.firstName)
    .Distinct()
    .ToList()

// After optimization
uniqueNames = new();
HashSet<string> seen = new();
foreach(Birth b in births)
{
    if(seem.Add(b.Name))
    {
        uniqueNames.Add(b.Name);
    }    
}
```

## About `Sort()` and `OrderBy()`

The `Sort()` or `OrderBy()` sadly cannot be weaved into `foreach` loop with `Where()`, since it requires the whole collection to be filtered before sorting.

# Use `Dictionary` for frequent search

Dictionaries are great for quick retrievals, especially for frequent ones. If you often search for a value, consider storing the data in a `Dictionary` instead of an `Array` or a `List`.

```c#
class GraveLease {
    public string graveId; 
    public DateTime startDate;
    public DateTime endDate;
} 

class Grave {
    public string id;
    public bool isOccupied;
}

graves = new List<Grave> ();

foreach(GraveLease lease in graveLeases){
    var grave = graves.FirstOrDefault(g => g.id == lease.graveId); // Can be optimised
    if(grave != null) continue;

    graves.Add(new Grave{ 
        id = lease,
        isOccupied = lease.startDate >= DateTime.Now && lease.endDate <= DateTime.Now,
        });
}

```


```c#
// Find leases of a selected grave

selectedGraveId = "GDH726";

// Before

GraveLease[] expiredleasesOfGrave = leases
    .Where(l => l.graveId == selectedGraveId && lease.endDate > DateTime.Today)
    .ToArray();

// After

GraveLease[] expiredleasesOfGrave = leasesByGraveid[selectedGraveId]
    .Where(lease.endDate > DateTime.Today)
    .ToArray();
```

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

---

```c#

Dictionary<int, List<NameCount>> nameCountsPerYear = new ();
int[] years = births.Select(b => b.year).Distinct().ToArray();
foreach (int year in years){

    firstNames = births.
        .Where(b => b.Year == year)
        .Select(b => b.FirstName)
        .ToList();
    
    List<Name> nameCounts = new ();

    foreach (string firstName in firstNames){
        var nameCount = nameCounts.FirstOrDefault(n => n.firstName == firstName);
        if (nameCount == null)
        {
            nameCounts.Add(new NameCount(){ firstName = firstName, number = 1 })
        } else
        {
            nameCount.number ++;
        }
    }
    nameCounts = nameCounts.OrderBy(nc => nc.number);
    nameCountsPerYear[year] = nameCounts;
}

class NameCount 
{
    public string firstName;
    public int number;
}

```

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