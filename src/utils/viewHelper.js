exports.generateDifficultyOptions = function(difficultyLevel) {
    const titles = [
        'Very Easy',
        'Easy',
        'Medium (Standart 3x3)',
        'Intermediate',
        'Expert',
        'Hardcore',
    ];

    const options = titles.map((title,index) => ({
        title: `${index + 1 } - ${title}`,
        value: index + 1,
        selected: Number(difficultyLevel) === index+1
    }))

    return options
}