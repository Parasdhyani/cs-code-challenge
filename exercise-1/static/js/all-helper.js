Handlebars.registerHelper('parseDateInISO', function(options) {

    let {date, format} = options.hash;
    return moment(new Date(date)).format(format); ;
})


