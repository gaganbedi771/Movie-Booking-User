import {dbUrl} from "../config/config";
import emailjs from "@emailjs/browser";
import { serviceId,templateId,publicKey } from "../config/config";


export const getAllData = async (token) => {
    try {

        const [moviesResponse, categoriesResponse, showTimesResponse] = await Promise.all([
            fetch(`${dbUrl}/movies.json?auth=${token}`),
            fetch(`${dbUrl}/categories.json?auth=${token}`),
            fetch(`${dbUrl}/showTimes.json?auth=${token}`)
        ]);

        const [moviesData, categoriesData, showTimesData] = await Promise.all([
            moviesResponse.json(),
            categoriesResponse.json(),
            showTimesResponse.json()
        ]);

        const movies = moviesData ? Object.keys(moviesData).map((key) => ({
            id: key,
            ...moviesData[key]
        })) : [];

        const categories = categoriesData ? Object.keys(categoriesData).map((key) => ({
            id: key,
            ...categoriesData[key]
        })) : [];

        const showTimes = showTimesData ? Object.keys(showTimesData).map((key) => ({
            id: key,
            ...showTimesData[key]
        })) : [];

        return {movies, categories, showTimes};

        
    } catch (error) {
        console.error("Error fetching all data:", error);
        throw error;
    }
}


export const bookTicket = async (bookingData, token) => {
    try {
        const response = await fetch(`${dbUrl}/bookings.json?auth=${token}`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(bookingData)
        });

        if (!response.ok) {
            throw new Error("Error booking ticket");
        }

        

        return await response.json();
    } catch (error) {
        console.error("Error booking ticket:", error);
        throw error;
    }
};


    export const sendConfirmationEmail = async (userEmail, emailData,booking_id) => {
    const emailString = `Booking Confirmation for ${emailData.movieName}\n\nDate: ${emailData.date}\nTime: ${emailData.time}\nNumber of Tickets: ${emailData.tickets}`;

        try {
            const response= await emailjs.send(
                serviceId,
                templateId,
                {
                    email: userEmail,
                    message: emailString,
                    booking_id: booking_id
                },
                publicKey
            );

            return response;
            
        } catch (error) {
            console.error("Error sending confirmation email:", error);
            throw error;
        }
    }