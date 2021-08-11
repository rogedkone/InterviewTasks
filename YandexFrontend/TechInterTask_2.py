'''
Дана строка, состоящая из букв латинского алфавита, цифр и скобок  {([])}.
Необходимо проверить, что скобки в строке сбалансированы — на каждую
открывающую скобку приходится закрывающая, и скобочные группы не пересекаются.
Напишите функцию, которая принимает такую строку и возвращает true,
если скобки сбалансированы, и false, если не сбалансированы.
'''

def isValid(str):
    steck = []
    for i in str:
        if not i.isalpha():
            if i in "({[":
                steck += i
                continue
            elif steck == []:
                return False
            elif steck[-1] == "(" and i != ")":
                return False
            elif steck[-1] == "[" and i != "]":
                return False
            elif steck[-1] == "{" and i != "}":
                return False
            else:
                steck += i
    if sum([steck.count("("), steck.count("["), steck.count("{")]) != sum([steck.count(")"), steck.count("]"), steck.count("}")]):
        return False
    else:
        return True

print(isValid("(foo)")) # true
print(isValid("(f[o]{o})")) # true
print(isValid("[(){}()()]")) # true
print(isValid("(foo")) # false
print(isValid("{f[o}o]")) # false
print(isValid("{}f[o}o]")) # false
print(isValid("{(}f[o}o]")) # false
print(isValid("(((}f[o}o]")) # false
print(isValid(")((}f[o}o]")) # false
