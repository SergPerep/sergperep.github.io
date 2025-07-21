# Optimize code performance - Quick and dirty

Simple ways to improve C# .NET code speed 

1. Iterate collection less:
    - To build data structures
    - Avoid chaining high-level functions
    - Avoid double sorting
2. Use string builder to generate strings
3. Use dictionaries to find values
4. Use insert sort algo when adding element to sorted collection
5. Avoid double sort
6. Do not covert to list intermediate collections
7. Arrays vs lists
8. Parallel tasks

# Avoid chaining collection extension methods

A LINQ extension method iterates the whole collection. A chain of extension methods iterates collections several times. This increases processing time. 

To optimise and save time - combine high-level functions into a single for-loop, which will iterate the collection a single time.

Let's say we have a collection of  1,025 pockemons, 159 of which are of water type. And we want to get the collection of water type pockemons.

```c#

// Before optimisation
List<string> waterPockemonNames = pockemons
    .Where(p => p.Types.Contains("Water")) // Iterates through 1025 items
    .Select(p => p.Name) // Iterates through 159 items
    .ToList() // Iterates through = 159 items

```

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
Some high-level functions are easily convertable into a for-loop such as
`.Where()`, `Select()`, `ToArray()`, `ToList()` and `ToDictionary()`.

Doing the same for `Distinct()` can be a bit more challenging. But here a short cut.

```c#
// Before optimization
births
    .Select(b => b.firstName)
    .Distinct()
    .ToList()
```

```c#
// After optimization
List<string> uniqueNames = new List<string>()
HashSet<string> seen = new HasSet<T>();
foreach(Birth b in births)
{
    if(seem.Add(b.Name))
    {
        uniqueNames.Add(b.Name);
    }    
}
```

The `Sort()` sadly cannot be weaved into for-loop with `Where()`, since it requires the whole collection to be filtered to before sorting.

# Avoid converting temporary collections to lists and arrays

Sometimes you build a temporary collection to use it as base for another collection. !Example!. 


# Consider dictionaries for repeated search

Dictionaries are great for quick retrieval, especially repeated ones. If you have to often search for a value, it might be a good idea to store the data in a `Dictionary` instead of an `Array` or a `List`.

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

# Insert without re-sorting

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

