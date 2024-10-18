//create a class called BandSiteApi
class BandSiteApi {
    constructor(apiKey) {
        this.apiKey = apiKey;
        this.baseUrl = "https://unit-2-project-api-25c1595833b2.herokuapp.com";
    }
    //method to get the list of comments
    async getComments() {
        try {
            const response = await axios.get(`${this.baseUrl}/comments?api_key=${this.apiKey}`, {
                headers: {
                    "Content-Type": "application/json"
                }
               });
               return response.data;
            } catch(error) {
                console.error("error getting comments", error);
            } 
        }
    //method to post comments
    async postComments(comment) {
        try {
            const response = await axios.post(`${this.baseUrl}/comments?api_key=${this.apiKey}`, comment, {
                headers: {
                    "Content-Type": "application/json"
                }
            });
                return response.data;
            } catch(error) {
                console.error("Error posting comment", error);
            }
        }
    //method to delete comments
    async deleteComments(commentId) {
        try {
            const response = await axios.delete(`${this.baseUrl}/comments/:id?api_key=${this.apiKey}`, commentId, {
                headers: {
                    "Content-Type": "application/json"
                }
            });
            console.log(`Comment ${commentId} deleted`);
        } catch(error) {
            console.error("error deleting comment", error);
        }
    }
    }

export default BandSiteApi;