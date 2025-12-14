import axios from 'axios';

export interface WorkUpdate {
    date: string;
    day: string;
    time: string;
    userName?: string; // Optional - not collected anymore
    workUpdate: string;
    imageUrl?: string;
}

export const googleSheets = {
    async saveUpdate(sheetUrl: string, update: WorkUpdate): Promise<boolean> {
        try {
            // Validate URL
            if (!sheetUrl || !sheetUrl.includes('script.google.com')) {
                throw new Error('Invalid Google Apps Script URL');
            }

            // Send data to Google Apps Script
            const response = await axios.post(
                sheetUrl,
                {
                    date: update.date,
                    day: update.day,
                    time: update.time,
                    userName: update.userName,
                    workUpdate: update.workUpdate,
                    imageUrl: update.imageUrl || '',
                },
                {
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    timeout: 10000, // 10 second timeout
                }
            );

            if (response.status === 200) {
                return true;
            }

            return false;
        } catch (error: any) {
            console.error('Error saving to Google Sheets:', error);
            if (error.response) {
                console.error('Response error:', error.response.data);
            }
            throw error;
        }
    },

    validateUrl(url: string): boolean {
        // Check if URL is a Google Apps Script Web App URL or Google Sheets viewing URL
        return (url.includes('script.google.com') && url.includes('/exec')) ||
            url.includes('docs.google.com/spreadsheets');
    },
};
