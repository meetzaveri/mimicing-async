

exports.every = function(arr, truthTest, callback) {
  let i = 0;
  function renderEvery(i) {
    console.log('Arr',arr);
    truthTest(arr[i], (dummyparams, bool) => {
      console.log('i(in truthtest) - ',i);
      // Normal Setup for flow in truthtest
      if (bool === true) {
        console.log('Bool',bool);
        // Custom Setup for last element in arr
        if (i === arr.length - 1) {
          truthTest(arr[i], (dummyparams, bool) => {
            if(bool === true){
              // return result in final function with boolean flag
              return callback(null, bool);
            }
            else{
              // return final function with err
              return callback(false, null);
            }
          })
        }
        // else when it's not last element, then use callbacks
        else if(i < arr.length - 1) {
          ++i;
          renderEvery(i);
        }
      }
      else {
        return callback('false', null);
      }
    });
  }
  renderEvery(i);
}

