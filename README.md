<h1 align="center">
  <br>
  <a href="https://dippr-production.herokuapp.com/"><img src="https://i.ibb.co/XVVkLKR/dippr-Github-Logo.png" alt="logo" border="0" width="100px"></a>
  <br>
  <br>
 <a href="https://dippr-production.herokuapp.com/"><img src="https://i.ibb.co/mqf1DKm/dippr-Main-Logo.png" alt="DIPPR" border="0" width="400px"></a>
  <br>
  <br>
</h1>

### Identifiants administrateur
* Email : admin@admin.fr
* Mdp : admin

# Contexte

Tu es persuadé que ton gratin de courgettes est le meilleur de l'univers ? Même meilleur que celui d'un chef étoilé ? Alors proposes-le sur [DIPPR](https://dippr-development.herokuapp.com/) ! (Voici aussi le [lien en dev](https://dippr-development.herokuapp.com/) si problèmes en prod... )

# Qu'est-ce que DIPPR ?

DIPPR est une application destinée aux particuliers  souhaitant troquer ou donner des plats maisons à d'autres particuliers ou des associations. L'idée est de créer un réseau communautaire et solidaire afin de partager ses spécialités tout en aidant les personnes dans le besoin.

## Pourquoi les particuliers utiliseraient-ils UPSTR ?

* Partager au plus grand monde des spécialités maisons
* Découvrir de nouveaux plats autour de chez soi
* Aider des associations de distribution alimentaire ou de maraude
* Accéder à un réseau de passionés

# Parcours utilisateur

Le parcours utilisateur est très simple :
<br/>
* Landing page présentant le concept
* Barre de recherche dans laquelle il est possible de rechercher des plats ouverts au troc, ou des plats ouverts au don
* Connexion/inscription puis redirection sur la page d'accueil qui contient les plats les plus récents autour de l'utilisateur (géolocalisation)
* Possibilité de mettre sur le marché un plat de type troc ou don, ou de le stocker dans "Mes spécialités"
* Si un plat mit sur le marché est de type troc, il est possible de faire une demande de troc en échange d'un plat
* Si un plat mit sur le marché est de type don, il est possible de faire une demande de don

# Caractéristiques

## Base de données

### Tables 

* Une table et un model `User` (Devise)
* Une table et un model `UserDish`
* Une table et un model `MarketDish`
* Une table et un model `Tag` (Devise)
* Une table et un model `Ingredient`
* Plusieurs tables de jointures entre les `Tag`, `Ingredient` et `MarketDish
* Une table et un model `Troc`
* Une table et un model `Donation`

### Models

* Un `User` a plusieurs `UserDish`, `MarketDish`, `Troc` et `Donation`
* Un `UserDish` a plusieurs `Ingredient` et `Tags`, et `MarketDish`
* Un `Troc` appartient à un `caller` et `answerer` (table `User`), et un `caller_dish` et un `answer_dish` (table `MarketDish`)
* Un `Donation` appartient à un `caller` et `answerer` (table `User`), et un `answer_dish` (table `MarketDish`)


## Backend

* RAILS API avec Devise-JWT
* Active Storage pour gérer les uploads de photos (blobs), les envoyer sur un bucket AWS S3 et retourner un URL pour le front
* Utilisation de la gem `pg_search` pour pouvoir générer une requête de recherche dans 3 tables différentes en même temps pour les `MarketDish`

## Frontend

Nous avons pensé l'application comme une PWA. L'UI est scindée en `Desktop` et `Mobile`.
  
* L'API Google Maps Javascript et Google Places afin d'afficher les plats sur la carte
* React Redux pour gérer le User connecté
* CSS géré avec React Material-UI au maximum responsive
*
* etc...

# Team

* 👨‍🚀 @DamVador
* 👨‍🚀 @Bakbledy93
* 👨‍🚀 @ThibaultClerc
