let add = (log, data) => {
    log.push(data);
    return JSON.stringify(log, null, 4);
};

module.exports = {
    add
};