const API_URL = "http://127.0.0.1:8000/api/trips/create/";

export const createTrip = async (tripData) => {
    try {
        const response = await fetch(API_URL, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(tripData),
        });

         // Try to parse the JSON error message
         let errorMessage = `HTTP ${response.status} - ${response.statusText}`;
        if (!response.ok) {
            try {
                const errorData = await response.json(); // Attempt to read response body
                errorMessage = errorData.error || JSON.stringify(errorData);
            } catch (jsonError) {
                console.error("Error parsing error response:", jsonError);
            }
        }

        return await response.json();
    } catch (error) {
        console.error("Error creating trip:", error);
        return null;
    }
};
