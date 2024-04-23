

## Workflow
When working on a feature:
- Step 1: Create a branch 
- Step 2: Add your changes 
- Step 3: Commit your changes 
- Step 4: Push your changes
- Step 5: Notify the team about your work so they can test it and merge them


### Example

Lets say you working on a feature that boils eggs 

Create a `boil-eggs` branch

```sh
git checkout -b boil-eggs
```

Add and commit your changes

```sh
git commit -m "Heat the pot to 100 degrees/ 212 Fahrenheit"
```

Make sure you are up to date with the master branch

```sh
git pull origin master
```

Finally push your changes

```sh
git push origin boil-eggs
```


After this notify the team

```
"""
Hello team I have pushed to `boil-eggs` (Portal Example)
- It does A, B and C
- Then does D, E and F
"""
```

## Guidelines

When coding please adhere to the following guidelines

