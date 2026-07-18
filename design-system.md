# Atelier by Orsayn — Design System

Extrait directement du code de production (`app/styles.css`, `app/components/*.tsx`). Toutes les valeurs ci-dessous sont réelles, pas des approximations — c'est la référence à utiliser pour les assets marketing (vidéos, carrousels, decks, templates).

---

## 1. Palette

Deux couches : des **neutres papier** (fond crème, encre quasi-noire) qui font tout le socle du site, et trois **accents sémantiques** — orange pour l'action, vert pour la validation, indigo réservé à un seul usage. Le orange n'est jamais dilué : soit plein, soit absent.

| Token | Valeur | Usage |
|---|---|---|
| `--paper` | `#F7F4EE` | Fond global des pages claires. Jamais blanc pur. |
| `--ink` | `#080807` | Texte principal + fonds sombres (nav, footer, sections dark). |
| `--surface` | `#EEE8DF` | Fond des sections alternées (résultats, features métier). |
| `--orange` | `#FF9F1C` | CTA primaire, accent, mot-clé coloré dans les titres. |
| `--green` | `#B4F481` | Succès, validation, badges "vu", checks. |
| `--indigo` | `#6864ED` | Réservé à la carte "conformité" du bento. Ne pas généraliser. |
| `--muted` | `#6E6A62` | Texte secondaire, sous-titres, légendes. |
| `--line` | `rgba(8,8,7,.12)` | Bordures fines. |
| Ember (eyebrow) | `#8F4600` | Couleur des labels majuscules sur fond clair — plus sourd que l'orange pur. |

Fonds de sections spécifiques :
- Section pricing : `#0B0B0A` (plus profond que `--ink`)
- Card featured pricing : `radial-gradient(circle at 50% -20%, rgba(255,140,20,.28), transparent 55%), linear-gradient(160deg, #241A0E, #121210 70%)`
- Card bento orange : `linear-gradient(145deg, #FFF7EA, #F2D5A7)`
- Card bento green : `linear-gradient(145deg, #F4FFE9, #D9F5BD)`
- Card bento indigo : `linear-gradient(145deg, #22213D, #5955C9)`

---

## 2. Typographie

Une seule famille pour tout : **Geist Variable** (`/fonts/geist-variable.woff2`, weight 100–900). Pas de serif, pas de seconde police. La hiérarchie se fait par la taille, un `letter-spacing` très négatif sur les gros titres, et le poids.

| Rôle | Taille | Tracking | Line-height | Poids |
|---|---|---|---|---|
| Hero H1 | `clamp(46px, 6.3vw, 90px)` | `-0.07em` | `.98` | ~600 |
| Section H2 | `clamp(36px, 5vw, 68px)` | `-0.052em` | `1.09` | ~600 |
| Card H3 (bento) | `clamp(23px, 2.3vw, 36px)` | `-0.042em` | `1.18` | ~600 |
| Body lead | `16px` | normal | `1.72` | 400, couleur `--muted` |
| Metric / chiffre clé | `26–74px` selon contexte | `-0.055/-0.07em` | `.95` | `750` |
| Eyebrow (label) | `10px` | `+0.18em` | `1.2` | `800`, uppercase, `#8F4600` |
| Bouton | `13px` | normal | `1` | `720` |

Règle : plus l'élément est grand (H1), plus le tracking est négatif et le line-height serré. Plus il est petit (eyebrow, bouton), plus le tracking devient positif et le poids monte.

---

## 3. Boutons

Trois variantes, toutes en **pilule** (`border-radius: 999px`), hauteur min `48px` (`44px` en `--small`). Relief "gomme dure" : dégradé vertical + ombre portée dure `0 4px 0` qui simule une épaisseur physique. Au clic, le bouton s'enfonce littéralement (`translateY(3px)`) — c'est la signature du système.

**`.button--primary`** (action n°1)
```css
color: var(--ink);
border: 1px solid #D57806;
background: linear-gradient(180deg, #FFC56F 0%, #FFA51F 30%, #F38B08 100%);
box-shadow: inset 0 1px 0 rgba(255,255,255,.8), inset 0 -1px 0 rgba(97,43,0,.2),
            0 4px 0 #A95800, 0 12px 28px rgba(255,137,0,.22);
```

**`.button--dark`** (action n°2 sur fond clair)
```css
color: white;
border: 1px solid #050504;
background: linear-gradient(180deg, #3A3A37, #11110F 68%);
box-shadow: inset 0 1px 0 rgba(255,255,255,.22), 0 4px 0 #000, 0 12px 28px rgba(0,0,0,.2);
```

**`.button--ghost` / `.button--glass`** (action n°2 sur fond sombre/image)
```css
color: white;
border: 1px solid rgba(255,255,255,.18);
background: linear-gradient(180deg, rgba(255,255,255,.15), rgba(255,255,255,.045));
backdrop-filter: blur(12px);
box-shadow: inset 0 1px 0 rgba(255,255,255,.16), inset 0 -1px 0 rgba(0,0,0,.45),
            0 3px 0 rgba(0,0,0,.5), 0 10px 24px rgba(0,0,0,.16);
```

Comportement commun : `hover → translateY(-1px)`, `active → translateY(3px)`, transition `.16s ease` sur transform/box-shadow/background/border-color. Icône SVG interne : `17×17px`.

---

## 4. Icônes

Bibliothèque **[Lucide](https://lucide.dev)** exclusivement (trait fin, coins arrondis, `stroke-width` par défaut). Jamais d'icônes pleines, jamais d'émojis.

Les icônes vivent presque toujours dans un **badge skeuomorphe** :

| Contexte | Container | Détail |
|---|---|---|
| Icône de bento-card | `52×52px`, radius `15px` | Dégradé blanc→beige + liseré interne + ombre "posée" |
| Bouton micro (voix) | `54×54px`, cercle | Dégradé orange + halo `0 0 0 12px rgba(255,159,28,.12)` |
| Check de validation | `62×62px`, cercle | Dégradé vert, même logique de halo |
| Icône inline (liste) | `19×19px` dans badge radius `7px` | Fond vert clair, bordure verte foncée |

```css
/* bento-card__icon */
width: 52px; height: 52px;
border: 1px solid rgba(8,8,7,.14);
border-radius: 15px;
background: linear-gradient(145deg, rgba(255,255,255,.96), rgba(237,232,223,.78));
box-shadow: inset 0 1px 0 white, inset 0 -1px 0 rgba(8,8,7,.08),
            0 4px 0 rgba(88,76,58,.16), 0 11px 24px rgba(42,35,24,.09);
```

---

## 5. Cards — la famille "bento" (section "Ce que ça change")

C'est la pièce la plus reconnaissable du système. Coin très arrondi (`28px`), fond quasi-blanc chaud `#FFFDF9`, **double ombre** : une ombre-socle dure `0 3px 0` qui pose la carte sur la page, et une ombre diffuse large en dessous. Trois cartes sur cinq portent un dégradé de couleur douce (orange, vert clair), une bascule en indigo foncé.

```css
.bento-card {
  padding: 32px;
  border: 1px solid var(--line);
  border-radius: 28px;
  background: #FFFDF9;
  box-shadow: inset 0 1px 0 rgba(255,255,255,.9), 0 3px 0 rgba(131,116,91,.1),
              0 22px 70px rgba(43,34,20,.06);
}
```

Grille : 12 colonnes, rythme asymétrique `7/5` puis `4/4/4` — jamais une grille uniforme.

Structure de contenu constante, toujours dans cet ordre :
1. Icône badge (52px)
2. Eyebrow (label métier : "Devis", "Trésorerie", "Marge"…)
3. Titre engageant à la 2ᵉ personne ("Répondez avant que le client appelle ailleurs.")
4. Phrase d'explication courte, `--muted`, `13px`
5. **Métrique chiffrée en pied de carte** — toujours présente : `1 min`, `+18 %`, `45→12 j`, `1 vue`, `Factur-X`. C'est la preuve, jamais une simple promesse.

### Autres familles de cards

**Proof-card** (bandeau chiffres clés, glass clair)
```css
padding: 24px 24px 18px;
border: 1px solid rgba(255,255,255,.9);
border-radius: 24px;
background: linear-gradient(170deg, rgba(255,255,255,.88), rgba(255,255,255,.56));
backdrop-filter: blur(20px) saturate(1.4);
box-shadow: inset 0 1px 0 rgba(255,255,255,.95), 0 14px 34px rgba(43,34,20,.07),
            0 36px 90px rgba(43,34,20,.08);
```
Chiffre en tête (`clamp(26px,2.6vw,38px)`, weight 750), légende `--muted` en dessous, avatar client en pied.

**Case-card** (témoignages, carousel)
- Photo pleine bleed, `aspect-ratio: .78`, radius `26px`
- Dégradé noir en pied : `linear-gradient(0deg, rgba(0,0,0,.92) 0%, rgba(0,0,0,.32) 52%, transparent 75%)`
- Badge résultat vert flottant en haut (`.case-result`, fond `--green`, pilule)
- Citation en Geist serré (`-0.025em`), séparateur fin puis nom + métier

**Article-card** (journal/blog)
- Radius `24px`, fond blanc, image `aspect-ratio: 1.55`
- Hover : `translateY(-5px)` + `box-shadow: 0 25px 60px rgba(44,34,18,.1)`, transition `.25s ease`

**Pricing-card / pricing-choice**
- Fond crème dégradé `linear-gradient(180deg, #FFFDF9, #F1EBE1)`
- Ombre-socle épaisse : `0 6px 0 #B3AA9C` (le double du bento) — l'objet le plus "physique" du système
- État sélectionné : halo radial orange + badge check flottant `content: "✓"`
```css
.pricing-choice.is-selected {
  border-color: #D57806;
  background: radial-gradient(circle at 50% -30%, rgba(255,159,28,.24), transparent 55%),
              linear-gradient(180deg, #FFF8EC, #F3E5CD);
  box-shadow: inset 0 1px 0 white, 0 6px 0 #B07A2A, 0 35px 90px rgba(255,137,0,.18);
}
```

---

## 6. Glass & skeuomorphisme léger

Sur fond sombre, le système bascule en **verre dépoli** : bordures blanches à 13% d'opacité, fond en dégradé blanc quasi-transparent, `backdrop-filter: blur(14px)`. Jamais de flou seul — toujours associé à une ombre interne haute (highlight) et une ombre externe basse (profondeur).

```css
/* Glass sur fond sombre (context-chip, demo-context) */
background: linear-gradient(170deg, rgba(255,255,255,.1), rgba(255,255,255,.03));
backdrop-filter: blur(14px);
box-shadow: inset 0 1px 0 rgba(255,255,255,.16), inset 0 -1px 0 rgba(0,0,0,.4),
            0 14px 34px rgba(0,0,0,.32);

/* Glass sur fond clair (proof-card, phrase-core) */
background: linear-gradient(170deg, rgba(255,255,255,.88), rgba(255,255,255,.56));
backdrop-filter: blur(20px) saturate(1.4);
```

La **saturation boostée** (`saturate(1.4)` à `1.5`) sur les glass clairs est ce qui donne l'effet "verre Apple" plutôt qu'un simple flou gris plat — à ne pas oublier en reproduisant l'effet ailleurs.

---

## 7. Ombres, radius & motion

Trois familles d'ombres cohabitent, jamais mélangées au hasard :

| Type | Exemple | Rôle |
|---|---|---|
| Ombre-socle dure | `0 4px 0 #A95800` | Relief physique (boutons, cards, pricing) |
| Ombre diffuse | `0 22px 70px rgba(43,34,20,.06)` | Profondeur douce sous les cards |
| Halo coloré | `0 0 0 12px rgba(255,159,28,.12)` | Accent autour d'un élément actif |

Échelle de radius fixe :
- `999px` — pilule (boutons, badges, eyebrow-pill)
- `28px` — cards majeures (bento, pricing, hero container)
- `16–20px` — chips, panels (context-chip, demo-doc, article-card)
- `11–15px` — icon badges

Motion :
- Boutons : `transition: transform .16s ease, box-shadow .16s ease` — hover `translateY(-1px)`, clic `translateY(3px)`
- Cards : hover `translateY(-4px)` sur `.25s ease` (plus lent que les boutons)
- Respecte `prefers-reduced-motion: reduce` (durées ramenées à `.01ms`)

---

## 8. Grille & structure

- Container standard : `width: min(1280px, calc(100% - 48px))` — toujours au moins `24px` de marge
- Sections "habillées" (dark, pricing, closing) : pleine largeur avec `border-radius: 28px`, comme des "cartes géantes" plutôt que des bandeaux plats
- Grille bento : 12 colonnes, rythme asymétrique (`7/5`, puis `4/4/4`) — jamais une grille uniforme 3×3
- `.section` : `padding: 120px 0` (desktop) / `85px 0` (mobile ≤800px)

---

## 9. Ton & contenu

Ce qui rend le système reconnaissable au-delà du visuel — à réutiliser tel quel dans les assets marketing :

- **Eyebrow = angle, pas catégorie.** "Ce que ça change", "Ça commence par une phrase" — jamais un nom de section générique comme "Fonctionnalités".
- **Titre en deux lignes courtes.** H2 systématiquement coupé en deux phrases nominales : *"Cinq angles morts. / Une seule mémoire."*
- **Un seul mot en orange par accroche forte.** *"Pas un salarié de plus."* — l'orange souligne la promesse, jamais plus d'un segment par titre.
- **Preuve chiffrée systématique.** Chaque bénéfice se ferme sur un chiffre vérifiable (`1 min`, `+18 %`, `45→12 j`) — jamais un adjectif seul.

---

## 10. Assets de référence

- Police : `public/fonts/geist-variable.woff2` (Geist Variable, licence dans `GEIST-LICENSE.txt`)
- Logo : `public/logo-atelier-blanc.png`
- Images hero : `public/brand/hero-chantier-v2.avif` / `.webp`
- Screenshots à jour capturés le 2026-07-18 : `artifacts/screenshots/` (à régénérer si le contenu change — le dossier contenait des versions datées lors de cette extraction)

**Fichier source de vérité pour toute mise à jour future de ce document : `app/styles.css`.**
