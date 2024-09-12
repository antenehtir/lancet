document.addEventListener('DOMContentLoaded', function() {
    const specialties = {
        "Psychiatry": ["Dr. Bezawit Sedika"],
        "Dental Surgery": ["Dr. Lidya Kebede"],
        "Neurology": ["Dr. Yared Zenebe"],
        "Surgery": ["Dr. Woubdel Kiflu"],
        "Urology": ["Dr. Seid Mohamed"]
    };

    // Doctor information with image links from Imgur
    const doctorInfo = {
        "Dr. Bezawit Sedika": {
            schedule: "Monday - Friday: 9:00 AM - 4:00 PM",
            profileImage: "https://imgur.com/a/SO81kJ4"
        },
        "Dr. Lidya Kebede": {
            schedule: "Tuesday, Thursday: 10:00 AM - 2:00 PM",
            profileImage: "https://imgur.com/a/SHZL5eZ"
        },
        "Dr. Yared Zenebe": {
            schedule: "Monday, Wednesday, Friday: 11:00 AM - 5:00 PM",
            profileImage: "https://imgur.com/a/kZJKkTO"
        },
        "Dr. Woubdel Kiflu": {
            schedule: "Wednesday, Saturday: 9:00 AM - 2:00 PM",
            profileImage: "https://imgur.com/a/v6r4lJy"
        },
        "Dr. Seid Mohamed": {
            schedule: "Tuesday, Thursday, Saturday: 8:00 AM - 12:00 PM",
            profileImage: "https://imgur.com/a/PCXVDsJ"
        }
        // Add more doctor profiles if necessary
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
