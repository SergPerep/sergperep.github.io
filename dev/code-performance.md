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

## Collection iteration

### Cut down collection iterations

```c#

books
    .Select(book => book.Title)
    .Where(book => string.IsNullOrEmpty(book.Title))
    .ToList()

```

```c#

    
```


