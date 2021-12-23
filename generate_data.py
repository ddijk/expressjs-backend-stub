import sys
import random
import string

genders = ['Male', 'Female','Other']

def get_item():
    name_length = random.randint(5,10)
    naam = ''.join(random.choices(string.ascii_letters, k=name_length))

    age = random.randint(10,100)
    
    gender = random.choice(genders)
    return { 'naam': naam, 'age': age, 'gender': gender}

def main():
    if len(sys.argv) < 2:
        print('Geef een aantal regels op')
        return

    n = int(sys.argv[1])
#    print(f'aantal regels: {n}')
    print('[')

    random.seed(33)
    for i in range(n):
        naam, age, gender = get_item().values()
        print(f'{{"name": "{naam}", "age": {age}, "gender": "{gender}", "index":{i}}},')

    naam, age, gender = get_item().values()
    print(f'{{"name": "{naam}", "age": {age}, "gender": "{gender}", "index":{n}}}')
    print(']')


if __name__=='__main__':
    main()
    
