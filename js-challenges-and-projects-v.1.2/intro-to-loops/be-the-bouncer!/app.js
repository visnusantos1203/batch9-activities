const nightClubRegister = [
    {
        name: 'Tony',
        lastname: 'Stark',
        age: 25,
        gender: 'male'
    },
    {
        name: 'Harry',
        lastname: 'Potter',
        age: 16,
        gender: 'male'
    },
    {
        name: 'Hermione',
        lastname: 'Granger',
        age: 17,
        gender: 'female'
    },
    {
        name: 'Steve',
        lastname: 'Rogers',
        age: 62,
        gender: 'male'
    }
]

for(let i = 0; i < nightClubRegister.length; i++){
    if(nightClubRegister[i].age < 18 && nightClubRegister[i].gender === 'female'){
        console.log (`Sorry Mrs/Ms. ${nightClubRegister[i].name}, you're only ${nightClubRegister[i].age} yrs old, minors are not allowed in this place`);
    } if((nightClubRegister[i].age < 18 && nightClubRegister[i].gender === 'male')){
        console.log(`Sorry Mr. ${nightClubRegister[i].name}, you're only ${nightClubRegister[i].age} yrs old, minors are not allowed in this place`);
    } else {
        console.log(`Welcome! ${nightClubRegister[i].name}`);
    }
}