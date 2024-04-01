// membuat variable response untuk costum response
const response = (statusCode, data, massage, res) => {
    res.status(statusCode).json({
        payload: {
            statusCode: statusCode,
            datas: data,
        },
        massage: massage,
        pagination: {
            prev: '',
            next: '',
            max: '',
        }
    });
}

// export module response
module.exports = response;