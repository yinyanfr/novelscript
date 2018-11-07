# Usage
## parser.js
```bash
$ node parser.js media.json scenario.txt output.json
```


## Scenario
Basic Syntax:
```
[function] param1 param2 ...
```
### Functions
#### scene
```javascript
scene(String name)
```

#### bgm
```javascript
bgm(String name)
```

#### bg
```javascript
bg(String name)
```

#### cg
```javascript
cg(String name)
```

#### join
```javascript
join(String charaterName, String imageName = "normal", int spliceIndex = NaN)
```

#### move
```javascript
move(String characterName, int x = 0, int y = 0, int zoom = 1, int duration = 100)
```

#### reset
```javascript
reset(String characterName1, String charaterName2, ...)
```

#### leave
```javascript
leave(String characterName, String animation = "default", bool adjustCapacity = true)
```

#### branch
```javascript
branch(String branchName)
```

#### end
```javascript
end()
```
