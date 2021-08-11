'''
 * Нужно написать функцию get. На вход функция принимает объект и путь до поля объекта. 
 * Путь – это строка, разделенная точкой. Функция должна вернуть соответствующее поле объекта. 
 * Запрашиваемого поля в объекте может не быть.
'''

def get(obj, path):
    path = path.split(".")
    for i in path:
        if i in obj.keys():
            obj = obj[i]
        else:
            return None
    return obj

obj = { "a": { "b": { "c": 'd'}, "e": 'f' } }

print(get(obj, 'a.b')) # {c: 'd'}
print(get(obj, 'a.b.c')) # 'd'
print(get(obj, 'a.e')) # 'f'
print(get(obj, 'a.x.e')) # None
