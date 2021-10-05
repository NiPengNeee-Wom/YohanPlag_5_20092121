let archive = [];

for (var i = 0; i<localStorage.length; i++) {
    archive[i] = localStorage.getItem(localStorage.key(i));
    console.log(archive);
}