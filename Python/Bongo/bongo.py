import random

des_nb = [1, 2, 3]
liste_animaux = ["Antilope", "Gnou", "Rhinocéros"]
nb_animaux = [0, 0, 0]

balles = []
for i in range(2):
    balles.append(random.randint(1, 3))
print("Balles : " + str(balles[0]) + " - " + str(balles[1]))

animaux = []
for i in range(5):
    animaux.append(liste_animaux[random.randint(0, 2)])
print("Animaux : " + animaux[0] + " - " + animaux[1] + " - " + animaux[2] + " - " + animaux[3] + " - " + animaux[4])

braconniers = []
for i in range(2):
    braconniers.append(liste_animaux[random.randint(0, 2)])
print("Braconniers : " + braconniers[0] + " - " + braconniers[1])

garde = liste_animaux[random.randint(0, 2)]
print("Garde chasse : " + garde)

#Gestion braconniers et garde chasse
if braconniers[0] == braconniers[1]:
    if braconniers[0] != garde:
        try:
            animaux.remove(braconniers[0])
        except:
            pass
elif braconniers[0] != braconniers[1]:
    for a in liste_animaux:
        if a != braconniers[0] and a != braconniers[1] and a != garde:
            try:
                animaux.remove(a)
            except:
                pass

#Gestion nombre recherché
if balles[0] == balles[1]:
    recherche = balles[0]
else:
    for i in des_nb:
        if i != balles[0] and i != balles[1]:
            recherche = i

#Calcul totaux animaux
for i in animaux:
    for j in liste_animaux:
        if i == j:
            nb_animaux[liste_animaux.index(j)] += 1

#Gestion animal recherché
trouve = 0
for i in nb_animaux:
    if i == recherche:
        trouve += 1
print("\nSolution : ", end="")
if trouve == 0:
    print("Aucun")
if trouve == 1:
    index = nb_animaux.index(recherche)
    print(liste_animaux[index])
if trouve == 2:
    for i in nb_animaux:
        if i != recherche:
            index = nb_animaux.index(i)
            print(liste_animaux[index])
