from generate_cases import zaak, generate_word

# def test_zaak():
#     expected = {'name':'dick', 'caseId':0, 'zaaknummer': 'aa'}
#     assert zaak(0, 'dick', 48) == expected

def test_word():
    assert len(generate_word(5,5)) == 5
