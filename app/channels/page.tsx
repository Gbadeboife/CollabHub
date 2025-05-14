

function Channels() {
    

    const baseUrl = process.env.NEXT_PUBLIC_BASE_URL
    const fetchChannels = async () => {
        try{
            /*const response = await fetch(`${baseUrl}/api/messages/send`,{
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    userId: 45,
                    channelId: 13,
                    content: 'text content'
                })
            })*/

            const response = await fetch(`${baseUrl}/api/workspaces/members/2`)
            console.log('success')
            const data = await response.json()
            console.log(data)

        } catch (error) {
            console.error("Error fetching channels:", error)
        }

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