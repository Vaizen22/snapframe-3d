# Guide de Monétisation (Comment gagner de l'argent)

Ce projet est conçu pour vous rapporter de l'argent à chaque fois que quelqu'un veut télécharger son image en haute qualité (4K) et sans filigrane.

Le système utilise une méthode de **"Lien court rémunéré"**.
C'est la méthode la plus simple et rapide pour commencer sans avoir de site web validé par Google.

## Étape 1 : Choisir une régie publicitaire
Inscrivez-vous sur l'un de ces sites (ce sont les plus populaires pour ce genre de méthode) :

1.  **Linkvertise** (Très populaire, paie bien)
2.  **Ouo.io** (Simple)
3.  **Adf.ly** (Classique)

*Note : Vous pouvez en choisir un autre si vous préférez.*

## Étape 2 : Créer votre lien rémunéré
Une fois inscrit :
1.  Cherchez le bouton "Create Link" ou "Shorten Link".
2.  Le site vous demandera une "Target URL" (URL de destination).
    *   C'est l'endroit où l'utilisateur ira après la pub.
    *   Comme votre application fait tout le travail elle-même, vous pouvez mettre n'importe quelle page de remerciement, ou même simplement votre page Instagram/Twitter pour gagner des followers en plus !
    *   *Exemple de destination :* `https://twitter.com/votre_compte` ou `https://google.com`.
3.  Le site va vous donner un **Lien Court** (ex: `https://link-center.net/12345/mon-lien`).

## Étape 3 : Configurer l'application
1.  Ouvrez le fichier `src/config.js` dans ce projet.
2.  Remplacez la valeur de `MONETIZED_LINK` par votre lien court.

```javascript
export const CONFIG = {
  // Collez votre lien ici
  MONETIZED_LINK: "https://link-center.net/12345/mon-lien", 
  
  // Temps d'attente (en secondes)
  WAIT_TIME_SECONDS: 15
}
```

## C'est tout !
Désormais, voici ce qui se passera :
1.  L'utilisateur clique sur "Download 4K Pro".
2.  Il doit cliquer sur "Unlock Now".
3.  Cela ouvre votre lien rémunéré. **Vous gagnez de l'argent.**
4.  Pendant qu'il regarde la pub, l'application attend 15 secondes.
5.  Une fois le temps écoulé, le bouton de téléchargement apparaît.
