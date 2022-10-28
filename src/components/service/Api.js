import axios from "axios";

const url = "https://randomuser.me/"



// Get User details
const getUsers = async () => {

    const response = await axios.get(url + 'api')

    return response.data
    
  }

  export default getUsers