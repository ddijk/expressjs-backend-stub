from generate_cases import zaak, generate_word, generate_day_or_month, generate_date
import pytest

# def test_zaak():
#     expected = {'name':'dick', 'caseId':0, 'zaaknummer': 'aa'}
#     assert zaak(0, 'dick', 48) == expected

def test_word():
    assert len(generate_word(5,5)) == 5



def test_day_month():
    # for 5 scenarios
    for i in range(5):
       day = generate_day_or_month(1, 28)
       month = generate_day_or_month(1, 12)
       assert  int(day) > 0 and int(day) < 29
       assert  int(month) > 0 and int(month) < 13
       assert  len(day) == 2
       assert  len(month) == 2

def test_date():
    assert len(generate_date()) == 10

