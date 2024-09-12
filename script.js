document.addEventListener('DOMContentLoaded', function() {
    const specialties = {
        "Cardiology": ["Dr. Seyfemichael Getachew"],
        "Endocrinology": ["Dr. Rediet Ambachew"],
        "Urology": ["Dr. Seid Mohammed"],
        "Dermatology": ["Dr. Selamawit Worku"],
        "Pediatrics": ["Dr. Selamawit Assefa"],
        "Nephrology": ["Dr. Seyfemichael Getachew"],
        "Internal Medicine": ["Dr. Serkalem Nurilign", "Dr. Seyfemichael Getachew"],
        "Obstetrics & Gynecology": ["Dr. Sisay Teklu"],
        "Radiology": ["Dr. Assefa Getachew"],
        "Neurosurgery": ["Dr. Kibruyisfaw Zewdie"],
        "Maxillofacial Surgery": ["Dr. Shimelis Megersa"]
    };


    // Doctor information with image links from Imgur
    const doctorInfo = {
        "Dr. Seyfemichael Getachew": {
            schedule: "Monday, Tuesday, Thursday, Saturday: 9:00 LT, Fridays: 5:00 LT",
            profileImage: "https://i.imgur.com/xvV0Nvn.jpg"
        },
        "Dr. Rediet Ambachew": {
            schedule: "Tuesday: 6:00 LT, Monday, Wednesday, Friday: 8:00 LT, Saturday: 3:00 LT",
            profileImage: "https://i.imgur.com/6ZWbu4n.jpg"
        },
        "Dr. Seid Mohammed": {
            schedule: "Monday: 5:00 LT, Tuesday, Thursday: 10:00 LT, Friday: 9:00 LT",
            profileImage: "https://i.imgur.com/VXahQRI.jpg"
        },
        "Dr. Selamawit Worku": {
            schedule: "Tuesday, Thursday: 2:00 PM, Wednesday, Saturday: 10:00 AM",
            profileImage: "https://i.imgur.com/z5rcaeV.jpg"
        },
        "Dr. Selamawit Assefa": {
            schedule: "Monday-Saturday during working hours",
            profileImage: "https://i.imgur.com/gO02t7J.jpg"
        },
        // Add more doctor profiles here
    };

    const specialtySelect = document.getElementById('specialty');
    const doctorSelect = document.getElementById('doctor');
    const doctorInfoContainer = document.getElementById('doctorInfo');
    const langSelect = document.getElementById('langSelect');
    const resetButton = document.getElementById('resetButton');

    const translations = {
        "en": {
            "availability": "Available at:",
            "bookAppointment": "Book an appointment:",
            "call": "Call:",
            "useThisLink": "Use this link",
            "reset": "Reset"
        },
        "am": {
            "availability": "መገኘት በ:",
            "bookAppointment": "ቀጠሮ ይሰርዙ:",
            "call": "ይደውሉ:",
            "useThisLink": "እዚህ ሊንክ ተጠቀም",
            "reset": "ዳግም ጀምር"
        }
    };

    langSelect.addEventListener('change', function() {
        const selectedLang = langSelect.value;
        document.querySelector('label[for="specialty"]').textContent = translations[selectedLang].selectSpecialty;
        document.querySelector('label[for="doctor"]').textContent = translations[selectedLang].selectDoctor;
        resetButton.textContent = translations[selectedLang].reset;
        updateDoctorInfoLanguage(selectedLang);  // Update doctor info if already displayed
    });

    specialtySelect.addEventListener('change', function() {
        const selectedSpecialty = specialtySelect.value;
        doctorSelect.innerHTML = '<option value="" disabled selected>Select a Doctor</option>';

        if (specialties[selectedSpecialty]) {
            doctorSelect.disabled = false;
            specialties[selectedSpecialty].forEach(doc => {
                const option = document.createElement('option');
                option.value = doc;
                option.textContent = doc;
                doctorSelect.appendChild(option);
            });
        } else {
            doctorSelect.disabled = true;
        }
        doctorInfoContainer.innerHTML = ''; // Clear doctor info
    });

    doctorSelect.addEventListener('change', function() {
        const selectedDoctor = doctorSelect.value;
        if (doctorInfo[selectedDoctor]) {
            const selectedLang = langSelect.value;
            const schedule = doctorInfo[selectedDoctor].schedule;
            const profileImage = doctorInfo[selectedDoctor].profileImage;

            doctorInfoContainer.innerHTML = `
                <img src="${profileImage}" alt="Profile image of ${selectedDoctor}" style="width: 150px; border-radius: 8px;"><br>
                <strong>${selectedDoctor}</strong> ${translations[selectedLang].availability} ${schedule}<br><br>
                <strong>${translations[selectedLang].bookAppointment}</strong><br>
                ${translations[selectedLang].call} <a href="tel:+2519171">9171/0977717171</a> <br>
                <a href="https://lancethealthservices.com/appointment.html" target="_blank">${translations[selectedLang].useThisLink}</a>
            `;
        }
    });

    resetButton.addEventListener('click', function() {
        specialtySelect.value = "";
        doctorSelect.innerHTML = '<option value="" disabled selected>Select a Doctor</option>';
        doctorSelect.disabled = true;
        doctorInfoContainer.innerHTML = '';
    });
});
