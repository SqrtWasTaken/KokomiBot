const profileModel = require('./profile-schema')
const levelXP = [
    0,
    1000,
    2325,
    4025,
    6175,
    8800,
    11950,
    15675,
    20025,
    25025,
    30725,
    37175,
    44400,
    52450,
    61375,
    71200,
    81950,
    93675,
    106400,
    120175,
    135050,
    151850,
    169850,
    189100,
    209650,
    231525,
    254775,
    279425,
    305525,
    333100,
    362200,
    392850,
    425100,
    458975,
    494525,
    531775,
    570750,
    611500,
    654075,
    698500,
    744800,
    795425,
    848125,
    902900,
    959800,
    1018875,
    1080150,
    1143675,
    1209475,
    1277600,
    1348075,
    1424575,
    1503625,
    1585275,
    1669550,
    1756500,
    1846150,
    1938550,
    2033725,
    2131725,
    2232600,
    2341550,
    2453600,
    2568775,
    2687100,
    2808625,
    2933400,
    3061475,
    3192875,
    3327650,
    3465825,
    3614525,
    3766900,
    3922975,
    4082800,
    4246400,
    4413825,
    4585125,
    4760350,
    4939525,
    5122700,
    5338925,
    5581950,
    5855050,
    6161850,
    6506450,
    6893400,
    7327825,
    7815450,
    8362650
]
const ascension = [
    {
        lvl: 20,
        gems: { type: 1, amount: 1},
        dewOfRepudiation: 0,
        sangoPearls: 3,
        specters: { type: 1, amount: 3}
    },
    {
        lvl: 40,
        gems: { type: 2, amount: 3},
        dewOfRepudiation: 2,
        sangoPearls: 10,
        specters: { type: 1, amount: 15}
    },
    {
        lvl: 50,
        gems: { type: 2, amount: 6},
        dewOfRepudiation: 4,
        sangoPearls: 20,
        specters: { type: 2, amount: 12}
    },
    {
        lvl: 60,
        gems: { type: 3, amount: 3},
        dewOfRepudiation: 8,
        sangoPearls: 30,
        specters: { type: 2, amount: 18}
    },
    {
        lvl: 70,
        gems: { type: 3, amount: 6},
        dewOfRepudiation: 12,
        sangoPearls: 45,
        specters: { type: 3, amount: 12}
    },
    {
        lvl: 80,
        gems: { type: 4, amount: 6},
        dewOfRepudiation: 20,
        sangoPearls: 60,
        specters: { type: 3, amount: 24}
    }
]
const updateXP = async (userID, amount) => {
    const user = await profileModel.findOne({userID: userID})
    const currentXP = user.progression.xp;

    let level;
    let newXP = currentXP+amount;

    for(const l of levelXP){
        if(currentXP<l){
            level = levelXP.indexOf(l);
            break;
        }
    }

    const maxXP = levelXP[ascension[user.progression.ascension].lvl-1];

    /*for(const asc of ascension){
        if(currentXP<=levelXP[asc.lvl-1]){
            const intendedAsc = ascension.indexOf(asc);
            maxXP = levelXP[asc.lvl-1];
            break;
        }
    }*/

    if(currentXP>maxXP){
        newXP = maxXP;
    }

    await profileModel.findOneAndUpdate(
        {userID: userID},
        {'progression.xp': newXP}
    )
}

module.exports = {
    update: updateXP,
    levelXP: levelXP,
    ascension: ascension,
}