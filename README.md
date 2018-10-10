# Celestials
Celestials MMO

————— [ Definitions ] —————

Round
	- Name (unique)
	- Description
	- Max Turns (30)
	- Turn (1 to Max Turns)
	- 3 days protection for all new realms

Turn
	- lasts 24 hours or 1 day
	- next turn timestamp
	- last turn timestamp
		- recalculate
			- recalculate all NPC counties resources
			- read-only all realms
			- recalculate all PC counties resources grouped per realm
			- reshuffle all shuffle decks
			- read-and-write all realms
	- can buy 1 card (will be placed into Mystical Deck) and into account card collection
		- cannot buy a card if already played or discarded a card this turn)
	- can use 1 card (either from mystical deck or from shuffled deck) or discard one card from shuffled deck
	- can do as many actions as resources are available

Account
	- email (unique)
	- password
	- God Name (unique)
	- gems
	- cards in collection

Card
	- Card UID (unique)
	- Card Name (unique)
	- Card Description
	- Card Collection Gem Cost
	- Card Gold Casting Cost
	- Card Food Casting Cost
	- Card Ore Casting Cost
	- Card Wood Casting Cost
	- Card Brick Casting Cost
	- Card Glass Casting Cost
		- Effects
			- Resource creation (forest, field, etc(
			- Resource generation (100 Gold)
			- Population generation (100 Workers)
Realm
	- Realm UID (primary)
	- Realm Name (unique)
	- Ruler Name
	- Ruler Gender
	- Ruler Race (Human)
	- Current Ruler Reputation (hidden until end of Round; show up or down arrow compared to last value)
	- Current  Ruler Fame (hidden until end of Round; show up or down arrow compared to last value)
	- Ruler Fame at End of Last Turn (hidden until end of Round)
	- Ruler Reputation at End of Last Turn (hidden until end of Round)
	- Ruler Mystical Deck
	- Ruler Deck (shuffled on every Turn)
	- Gold	(initial defaults to Workers*1)
	- Food	(initial defaults to Workers*5)
	- Ore	(initial defaults to Military/2)
	- Wood  (initial defaults to Military*1)
	- Brick	(initial defaults to 0)
	- Glass (initial defaults to 0)
	- worldX
	- worldY

County
	- County UID (primary)
	- Realm UID (NULL means an NPC)
	- isCapital
	- isColonized (requires moving at least (capital_default_workers/2) and (capital_default_military/2)) and X Gold
	- taxRate (defaults to default_tax_rate = 10%; max_tax_rate = 50%)
	- lastHappiness (0-100)
	- regionX
	- regionY
	- housingLevel (0-4)
		- capital defaults to 1 (village)
		- non-capital defaults to 0 (hamlet)
	- worker
		- capital defaults to capital_default_workers = 1000
		- non-capital defaults to workers sent to colonize
	- military
		- capital defaults to capital_default_military = 100
		- non-capital defaults to military sent to colonize
	- rogue
		- capital defaults to capital_default_rogue = 0
		- non-capital defaults to 0
	- sorcerer
		- capital defaults to capital_default_sorcerer = 0
		- non-capital defaults to 0
	- forest (generate natural resources based on county value range between X and Y)
	- field (generate natural resources based on county value range between X and Y)
	- lake (generate natural resources based on county value range between X and Y)
	- mountain (generate natural resources based on county value range between X and Y)
	- desert (generate natural resources based on county value range between X and Y)


————— [ Costs ] —————

Housings
	- Hamlet		LVL0	5000		100Wood Workers+Military
	- Village		LVL1	10000		Gold Wood
	- Town			LVL2	30000		Gold Wood Brick
	- City			LVL3	50000		Gold Wood Brick Ore
	- Metropolis		LVL4	100000		Gold Wood Brick Ore Glass

Unit Details
	- Worker	Eats 1 Food
	- Military	Eats 5 Food	Transformation Cost: 3 Ores / 5 Gold				7 / 15 /  20
	- Rogue		Eats 3 Food	Transformation Cost: 1 Ores / 20 Gold / 1 Wood			4 /  9 /  12
	- Sorcerer	Eats 2 Food	Transformation Cost: 2 Ores / 50 Gold / 1 Wood / 1 Glass	1 /  3 /  5

Resource Details
	- Gold		Worker Tax
	- Food		Lake, Field, Forest
	- Wood		Forest
	- Brick		Field
	- Ore		Mountain
	- Glass		Desert


————— [ Mathematics ] —————

PB = Population Space Bonus	(0 to 25)
	25 * (current population / max population for housing)

FB = Food Surplus Bonus		(0 to 25)
	25 * (consumed food for this turn / initial food at beginning of turn)

TRHM = Tax Rate Happiness Modifiers (-50 to 50)
	- TRHM = max_tax_rate - (tax_rate * tax_rate_happiness_modifier)
		- tax_rate_happiness_modifier
			if tax_rate <= 10	0-10	tax_rate_happiness_modifier = 0.667
			if tax_rate <= 20	11-20	tax_rate_happiness_modifier = 0.85
			if tax_rate == 21		tax_rate_happiness_modifier = 1.0
			if tax_rate == 22		tax_rate_happiness_modifier = 1.1
			if tax_rate == 23		tax_rate_happiness_modifier = 1.2
			if tax_rate == 24		tax_rate_happiness_modifier = 1.25
			if tax_rate == 25		tax_rate_happiness_modifier = 1.3
			if tax_rate == 26		tax_rate_happiness_modifier = 1.4
			if tax_rate >= 27	21-50	tax_rate_happiness_modifier = 1.5

TRPM = Tax Rate Productivity Modifiers	(0.5 to 1.0)
	- TRPM = 1.0 - (tax_rate/100)

Happiness			(PB + FB + TRHM) / 100	(is a %)
Productivity			TRPM			(is a %)
Worker Growth			Workers    * Happiness
Gold Generation			Workers/1  * Productivity * (tax_rate/100)
Food Generation			Workers/1  * Productivity * (tax_rate/100) * (10*Lakes + 5*Fields + 2*Forests))
Wood Generation			Workers/2  * Productivity * (tax_rate/100) * (1*Forests)
Brick Generation		Workers/3  * Productivity * (tax_rate/100) * (1*Fields)
Ore Generation			Workers/5  * Productivity * (tax_rate/100) * (1*Mountains)
Glass Generation		Workers/10 * Productivity * (tax_rate/100) * (1*Deserts)

Desert   = 800  .10
Mountain = 1000  .5
Lake	 = 500   10
Field	 = 600   5.3
Forest	 = 400   2.5


[ Round Initial Market Value ] 100
Food  Stock(4250) %(88.88) = 1
Wood  Stock(125)  %(2.61)  = 40
Brick Stock(85)   %(1.77)  = 50
Gold  Stock(250)  %(5.22)  = 20
Ore   Stock(50)   %(1.05)  = 100
Glass Stock(25)   %(0.52)  = 200
———
10 Gold for Glass
10 * 20 = 200 -> 1
260 gold
24 glass
—> recalculate market values of all resources


[ Capital Generation ]
Option #1
  - 1 field
  - 2 forest
  - 2 mountain
Option #2
  - 1 field
  - 2 forest
  - 2 desert
Option #3
  - 1 field
  - 1 forest
  - 1 lake

[ County Generation ]
Option #1
  - 1 mountain
  - 1 forest
Option #2
  - 1 desert
  - 1 forest
Option #3
  - 1 mountain
  - 1 field
Option #4
  - 1 desert
  - 1 field
Option #5
  - 1 desert
  - 1 mountain
Option #6
  - 1 lake
Option #7
  - 2 fields
Option #8
  - 2 forest




Alliance NPC Behaviors
	- Agressive
	- Neutral
	- Pacifist
	- Chaotic (randomly changes every time)





====

Version 2

Deployment Stack (Production)

Rogues
Sorcerers

Home Container
  - anonymous feedback form
  - option to recover lost password

Create Container on Realm Creation Step:
  - click on county to see its details
  - option to click on mulligan only once and reshuffle the capital and county generation


====

Version 3

More Cards!
 - crystals
 - Account bound Card Collections
 - Store card collections to buy

Home Container
  - option to join and login using google account (oauth)

Bug fixes and enhacements

====

Version 4

Politics and empires
forge and detect messages

Bug fixes and enhacements

====

Version 5

Races
Random Events

====

Version 6

purchasable Relics (crystals)
Multi Realms
