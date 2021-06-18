let commonUtility = {

    httpGet: "GET",
    httpPost: "POST",
    serverURL: "https://5dc588200bbd050014fb8ae1.mockapi.io/assessment",

    renderData: function() {
        return new Promise(function(resolve, reject) {
            commonUtility.fetchDataFromUrl(commonUtility.serverURL, commonUtility.httpGet).then((responseData)=> {
                resolve(commonUtility.successCallback(responseData));
             }).catch(function(err) {
                reject(commonUtility.errorCallback(err))
            });
        }); 

    },

    fetchDataFromUrl: function(url, method) {
        return new Promise((resolve, reject) => {
        $.ajax({
            type: method,
            url: url,
            data: {},
            success: function (response) {
                resolve(response)
            },
            error: function (err) {
                reject(err)
            }
        })
        });
    },

    loadFromControllerAndAddToComponent: function(url, method) {
         commonUtility.fetchDataFromUrl(url, method).then(function(responseData) {
             commonUtility.successCallback(responseData)
         }).catch(function(err) {
             commonUtility.errorCallback(err)
         })

         commonUtility.testFunc();
    },

    getHbsPromise:function(templateName) {
            return new Promise(function(resolve, reject) {
                $.ajax({
                    url: "/static/hbs-templates/" + templateName + '.hbs',
                    method: 'GET',
                    async: false,
                    cache: true,
                    success: function(data) {
                      console.log("Data==", data);
                        resolve(data);
                    },
                    error: function (error) {
                        console.log("error while reading file=", error)
                        reject(error)
                    }
                });
            })
        },

    successCallback: function(userList) {
      commonUtility.getHbsPromise("userList").then((userHtml)=> {
        const userTemplate = Handlebars.compile(userHtml);
        const userDOM = userTemplate({userList:userList});
        $("#userList").html(userDOM);
        return "Dom Render successfully"
      });
    }, 

    errorCallback: function(errData) {
      console.warn("Errro while fetching data==", errData);
      return "Error in processing";
    }
  }