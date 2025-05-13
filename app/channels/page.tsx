

function Channels() {
    

    const baseUrl = process.env.NEXT_PUBLIC_BASE_URL
    const fetchChannels = async () => {
        /*try{
            const response = await fetch(`${baseUrl}/api/workspaces/`,{
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    name: "General",
                    ownerId: 1
                })
            })
            console.log('success')
            const data = await response.json()
            console.log(data)

        } catch (error) {
            console.error("Error fetching channels:", error)
        }*/

    }

    fetchChannels()

    return (
        <div>
        <h1>Channels</h1>
        
        <p>Welcome to the channels page!</p>
        </div>
    );



}


export default Channels;