import $ from 'jquery';

const fetch = url => {
    return new Promise((resolve, reject) => {
        $.get('http://vitsalis.com:8010' + url).done(res => {
            resolve(res);
        }).fail(err => {
            console.log(err);
            reject(err);
        });
    });
};

export {fetch};
