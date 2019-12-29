// import axios from 'axios';
import Jsonp from 'jsonp';

export default class Ajax {
  static jsonp(opt) {
    return new Promise((resolve, reject) => {
      Jsonp(opt.url, {
        param: 'callback'
      }, function(err, response) {
        if(err) {
          reject(response);
        }else {
          resolve(response)
        }
      })
    })
  }
}