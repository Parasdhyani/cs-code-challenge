var JasmineHelpers = function () {
    return {
          successData: 
          [
              {"id":"16","createdAt":"2021-03-31T13:24:14.020Z","name":"Ryann Wiegand",
              "avatar":"https://s3.amazonaws.com/uifaces/faces/twitter/daykiine/128.jpg"},
              {"id":"17","createdAt":"2021-03-31T14:36:34.443Z","name":"Waldo Weimann",
              "avatar":"https://s3.amazonaws.com/uifaces/faces/twitter/dotgridline/128.jpg"},
              {"id":"18","createdAt":"2021-03-31T11:00:08.520Z","name":"Reed Pouros",
              "avatar":"https://s3.amazonaws.com/uifaces/faces/twitter/salvafc/128.jpg"}]  
    }

};


describe("Test common utility js, which contain the calling API and show in the HBS",  ()=> {
    
    it('Test cases on  the Common Utility for success', (done) => { 
        spyOn(commonUtility, "fetchDataFromUrl").and.returnValue(Promise.resolve(JasmineHelpers.successData));
        spyOn(commonUtility, "successCallback").and.callFake(function() {
           return "All DOM render"
      });

      spyOn(commonUtility, "errorCallback").and.callFake(function() {
        return "Error in rendering DOM"
   });

   
            commonUtility.renderData().then(function(responseData) {
            expect(commonUtility.fetchDataFromUrl).toHaveBeenCalled();
            expect(commonUtility.successCallback).toHaveBeenCalled();
            done();
        });
});

it('Test cases on  the Common Utility for Error', (done) => { 
    spyOn(commonUtility, "fetchDataFromUrl").and.returnValue(Promise.reject("Error in processing data"));
    spyOn(commonUtility, "errorCallback").and.callFake(function() {
       return "There are some issues in rendering DOM"
  });

        commonUtility.renderData().catch(function(responseData) {
        expect(commonUtility.fetchDataFromUrl).toHaveBeenCalled();
        expect(commonUtility.errorCallback).toHaveBeenCalled();
        done();
    });
});


})