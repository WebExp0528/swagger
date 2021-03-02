/**
 * Created by Precision on 03/01/2017.
 */

app.service('JournalingService', function(APIHandler){

    this.Search = function(query){
        return APIHandler.Get(`journaling/search/findByContentContains?query=${query}`);
    };
});
