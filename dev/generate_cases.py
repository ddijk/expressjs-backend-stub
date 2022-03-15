import json
import sys
import random
import string


def generate_word_fixed_length(length):
    return generate_word(length, length)

def generate_word(min_len, max_len):
    name_length = random.randint(min_len,max_len)
    return ''.join(random.choices(string.ascii_letters, k=name_length))

def generate_numeric_fixed_length(length):
    return ''.join([str(random.randint(0,9)) for i in range(length) ])

def generate_day_or_month(min, max):
    return str(100+random.randint(min, max))[1:]


def zaak(case_id):

    zaak_nummer = generate_numeric_fixed_length(8)
    name = ' '.join([generate_word(5,10), zaak_nummer])

    return { 
        'caseId': case_id, 
        'name': name, 
        "medewerker": '-',
        "erkend": 0,
        "archived": False,
        "blocked": random.randint(1,10) < 7,
        "caseArchiveCheck": None if random.randint(1,10) < 7 else 'some-value',
        "type": "BEOORDELIN",
        "referentie": "_(1)_@_(2)_RECHTSTREEKS_(3)_@_(4)_NIET ERKEND_///_(a)_@_(b)_@_(c)_@_(d)_@_(e)_@_(f)_@",
        "zaaknummer": zaak_nummer,
        "nawWederpartij": {
            "instantie": "Delta Lloyd Schadeverzekering N.V. ",
            "naam": "Bakker",
            "plaats": "AMSTERDAM  ",
            "postbusAndOrPostcode": "Postbus 1000 1000 BA  "
         },
        "totaalBgkGedeclareerd": 13000,
        "totaalBgkOntvangen": 10000,
        "debiteurenSaldo": 5000.0,
        "hoofdsom": {
                "timestamp": "2021-10-11",
                "nu": 10000.0,
                "potentieel": 23000.0
        },
        "totaalDoorbetaald": 5000,
        "datumLastAct": generate_date(),
        "datumLastBgkBetaling": generate_date(),
        "datumLastDoorbetaald": generate_date(),
        "datumLastContactClient": None,
        "datumLastContactWederpartij": None,
        "datumLastContactMedisch": None,
        "datumLastContactCustomCodes": None

    }

def generate_date():
    return f'{random.randint(1995,2021)}-{generate_day_or_month(1,12)}-{generate_day_or_month(1,28)}'

def last_date(case_id):
    return {
        'caseId' : case_id,
        'datumLastContactClient' : generate_date(),
        'datumLastContactWederpartij' : generate_date(),
        'datumLastContactMedisch' : generate_date(),
        'datumLastContactCustomCodes' : generate_date()
    }

def add_zaak(lijst, case_id):
    lijst.append(zaak(case_id))

def add_last_dates(lijst, case_id):
    lijst.append(last_date(case_id))


def main():
    if len(sys.argv) < 2:
        print('Geef een aantal regels op')
        return

    n = int(sys.argv[1])

    zaken_lijst = []
    dates_lijst = []
    for case_id in range(n):
        add_zaak(zaken_lijst, case_id)
        add_last_dates(dates_lijst, case_id)

    with open("bgk_generated.json", "w") as fh:
       fh.write(json.dumps({'content': zaken_lijst}))

    with open("latest_dates_generated.json","w") as file:
        file.write(json.dumps(dates_lijst))

if __name__ == '__main__':
    main()




#def get_item():
#    name_length = random.randint(5,10)
#    naam = ''.join(random.choices(string.ascii_letters, k=name_length))
#
#    age = random.randint(10,100)
#    
#    gender = random.choice(genders)
#    return { 'naam': naam, 'age': age, 'gender': gender}
#

#
#
#        {
#            "caseId": 61087,
#            "name": "Heijde, A. van der Ongeval 20550637",
#            "medewerker": "-",
#            "erkend": 0,
#            "type": "BEOORDELIN",
#            "referentie": "_(1)_@_(2)_RECHTSTREEKS_(3)_@_(4)_NIET ERKEND_///_(a)_@_(b)_@_(c)_@_(d)_@_(e)_@_(f)_@",
#            "zaaknummer": "20550637",
#            "nawWederpartij": {
#                "instantie": "Delta Lloyd Schadeverzekering N.V. ",
#                "naam": "Bakker",
#                "plaats": "AMSTERDAM  ",
#                "postbusAndOrPostcode": "Postbus 1000 1000 BA  "
#            },
#            "totaalBgkGedeclareerd": null,
#            "totaalBgkOntvangen": null,
#            "debiteurenSaldo": 0.0,
#            "hoofdsom": {
#                "timestamp": "2021-10-11",
#                "nu": 10000.0,
#                "potentieel": 23000.0
#            },
#            "totaalDoorbetaald": null,
#            "datumLastAct": null,
#            "datumLastBgkBetaling": null,
#            "datumLastDoorbetaald": null,
#            "datumLastContactClient": null,
#            "datumLastContactWederpartij": null,
#            "datumLastContactMedisch": null,
#            "datumLastContactCustomCodes": null
#        },