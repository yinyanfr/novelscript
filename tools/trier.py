import os

pwd = os.getcwd()
print(pwd)

name = os.name
print(name)

# os.mkdir("release")

login = os.getlogin()
print(login)

ls = os.listdir()
lss = []
for i in ls:
    if i[-3:] == ".js" and i != "jquery-1.11.2.min.js" and i != "NovelScript.js" and i != "demo.js":
        lss.append(i)

print(lss)

# os.remove("align.js")
f = open("NovelScript.js", mode = "w+", encoding = "utf-8")

for i in lss:
    print(i)
    tmp = open(i, mode = "r", encoding = "utf-8")
    l=tmp.read()
    print(l)
    f.write(l)
    f.write("\n")
