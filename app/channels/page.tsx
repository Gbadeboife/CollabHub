

function Channels() {
    

    const baseUrl = process.env.NEXT_PUBLIC_BASE_URL
    const fetchChannels = async () => {
        try{
            const response = await fetch(`${baseUrl}/api/workspaces/members/create`,{
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    userId: 45,
                    workspaceId: 1,
                    role: 'admin'
                })
            })
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