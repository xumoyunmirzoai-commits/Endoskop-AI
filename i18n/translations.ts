export const translations = {
  en: {
    header: {
      title: 'Endo-AI Assistant',
      subtitle: 'AI-Powered Decision Support for Endoscopy',
    },
    navigation: {
      home: 'Home',
      history: 'Analysis History',
      collapse: 'Collapse Menu',
      openMenu: 'Open Menu',
    },
    app: {
      awaitingAnalysis: {
        title: 'Awaiting Analysis',
        subtitle: 'Enter patient data and upload an image to begin.',
      }
    },
    uploader: {
      title: 'Upload Image for Analysis',
      button: {
        analyzing: 'Analyzing...',
        analyze: 'Analyze Image',
        clear: 'Clear',
      },
      placeholder: {
        click: 'Click to upload',
        drag: 'or drag and drop',
        formats: 'JPG, PNG, or WEBP',
      },
    },
    patientForm: {
      title: 'Patient Information',
      summaryTitle: 'Patient Information',
      patientId: 'Patient ID',
      patientName: 'Patient Name',
      age: 'Age',
      gender: 'Gender',
      selectGender: 'Select gender...',
      male: 'Male',
      female: 'Female',
      procedureDate: 'Procedure Date',
      saveButton: 'Save Information',
      editButton: 'Edit',
    },
    samples: {
      title: 'Or use a sample image',
    },
    report: {
      title: 'AI Analysis Report',
      fullscreen: 'Enter Fullscreen',
      exitFullscreen: 'Exit Fullscreen',
      patientDetails: 'Patient Details',
      summary: 'Observational Summary',
      findings: 'Detailed Findings',
      table: {
        name: 'Finding',
        confidence: 'Confidence',
        location: 'Location',
        description: 'Description',
      },
      noFindings: 'No specific pathological findings were identified.',
    },
    disclaimer: {
      title: 'For Investigational Use Only',
      text: 'This tool is a decision support system and is not a substitute for professional medical advice. All findings must be verified by a qualified medical professional.',
    },
    loader: {
      title: 'Performing Analysis',
      message1: 'Initializing AI model...',
      message2: 'Processing image data...',
      message3: 'Identifying key features...',
      message4: 'Calibrating confidence scores...',
      message5: 'Cross-referencing with clinical data...',
      message6: 'Generating final report...',
    },
    feedback: {
      title: 'Was this analysis helpful?',
      accurate: 'Accurate',
      inaccurate: 'Inaccurate',
      commentPlaceholder: 'Provide additional feedback (optional)',
      submit: 'Submit Feedback',
    },
    history: {
        title: 'Analysis History',
        subtitle: 'Review past analyses and reports.',
        empty: 'No history found. Perform an analysis to see it here.',
        viewReport: 'View Report',
        delete: 'Delete',
        deleteConfirm: 'Are you sure you want to delete this analysis?',
        patient: 'Patient',
        date: 'Date',
    },
    controls: {
        save: 'Save to History',
        saved: 'Saved',
        exportPdf: 'Export as PDF',
        newPatient: 'New Patient',
    }
  },
  ru: {
    header: {
      title: 'Endo-AI Ассистент',
      subtitle: 'Поддержка принятия решений в эндоскопии с помощью ИИ',
    },
    navigation: {
      home: 'Главная',
      history: 'История анализов',
      collapse: 'Свернуть меню',
      openMenu: 'Открыть меню',
    },
    app: {
      awaitingAnalysis: {
        title: 'Ожидание анализа',
        subtitle: 'Введите данные пациента и загрузите изображение, чтобы начать.',
      }
    },
    uploader: {
      title: 'Загрузите изображение для анализа',
      button: {
        analyzing: 'Анализ...',
        analyze: 'Анализировать',
        clear: 'Очистить',
      },
      placeholder: {
        click: 'Нажмите для загрузки',
        drag: 'или перетащите',
        formats: 'JPG, PNG, или WEBP',
      },
    },
    patientForm: {
      title: 'Информация о пациенте',
      summaryTitle: 'Информация о пациенте',
      patientId: 'ID пациента',
      patientName: 'Имя пациента',
      age: 'Возраст',
      gender: 'Пол',
      selectGender: 'Выберите пол...',
      male: 'Мужской',
      female: 'Женский',
      procedureDate: 'Дата процедуры',
      saveButton: 'Сохранить',
      editButton: 'Изменить',
    },
    samples: {
      title: 'Или используйте образец',
    },
    report: {
      title: 'Отчет об анализе ИИ',
      fullscreen: 'Полный экран',
      exitFullscreen: 'Выйти из полного экрана',
      patientDetails: 'Данные пациента',
      summary: 'Наблюдательное резюме',
      findings: 'Подробные результаты',
      table: {
        name: 'Результат',
        confidence: 'Уверенность',
        location: 'Местоположение',
        description: 'Описание',
      },
      noFindings: 'Патологических изменений не выявлено.',
    },
    disclaimer: {
      title: 'Только для исследовательских целей',
      text: 'Этот инструмент является системой поддержки принятия решений и не заменяет профессиональную медицинскую консультацию. Все результаты должны быть проверены квалифицированным медицинским работником.',
    },
    loader: {
      title: 'Выполнение анализа',
      message1: 'Инициализация модели ИИ...',
      message2: 'Обработка данных изображения...',
      message3: 'Определение ключевых особенностей...',
      message4: 'Калибровка оценок уверенности...',
      message5: 'Сверка с клиническими данными...',
      message6: 'Создание окончательного отчета...',
    },
    feedback: {
      title: 'Был ли этот анализ полезен?',
      accurate: 'Точный',
      inaccurate: 'Неточный',
      commentPlaceholder: 'Оставьте дополнительный отзыв (необязательно)',
      submit: 'Отправить отзыв',
    },
    history: {
        title: 'История анализов',
        subtitle: 'Просмотр прошлых анализов и отчетов.',
        empty: 'История не найдена. Выполните анализ, чтобы увидеть его здесь.',
        viewReport: 'Посмотреть отчет',
        delete: 'Удалить',
        deleteConfirm: 'Вы уверены, что хотите удалить этот анализ?',
        patient: 'Пациент',
        date: 'Дата',
    },
    controls: {
        save: 'Сохранить в историю',
        saved: 'Сохранено',
        exportPdf: 'Экспорт в PDF',
        newPatient: 'Новый пациент',
    }
  },
  uz: {
    header: {
      title: 'Endo-AI Yordamchi',
      subtitle: 'Endoskopiya uchun sun\'iy intellektga asoslangan qarorlarni qo\'llab-quvvatlash',
    },
    navigation: {
      home: 'Bosh sahifa',
      history: 'Tahlillar tarixi',
      collapse: 'Menyuni yig\'ish',
      openMenu: 'Menyuni ochish',
    },
    app: {
      awaitingAnalysis: {
        title: 'Tahlil kutilmoqda',
        subtitle: 'Boshlash uchun bemor ma\'lumotlarini kiriting va rasmni yuklang.',
      }
    },
    uploader: {
      title: 'Tahlil uchun rasmni yuklang',
      button: {
        analyzing: 'Tahlil qilinmoqda...',
        analyze: 'Tahlil qilish',
        clear: 'Tozalash',
      },
      placeholder: {
        click: 'Yuklash uchun bosing',
        drag: 'yoki olib kelib tashlang',
        formats: 'JPG, PNG, yoki WEBP',
      },
    },
    patientForm: {
      title: 'Bemor ma\'lumotlari',
      summaryTitle: 'Bemor ma\'lumotlari',
      patientId: 'Bemor IDsi',
      patientName: 'Bemor ismi',
      age: 'Yoshi',
      gender: 'Jinsi',
      selectGender: 'Jinsni tanlang...',
      male: 'Erkak',
      female: 'Ayol',
      procedureDate: 'Muolaja sanasi',
      saveButton: 'Saqlash',
      editButton: 'Tahrirlash',
    },
    samples: {
      title: 'Yoki namunadan foydalaning',
    },
    report: {
      title: 'SI Tahlil Hisoboti',
      fullscreen: 'To\'liq ekran',
      exitFullscreen: 'To\'liq ekrandan chiqish',
      patientDetails: 'Bemor haqida ma\'lumot',
      summary: 'Kuzatuv xulosasi',
      findings: 'Batafsil topilmalar',
      table: {
        name: 'Topilma',
        confidence: 'Ishonch',
        location: 'Joylashuvi',
        description: 'Tavsif',
      },
      noFindings: 'Maxsus patologik topilmalar aniqlanmadi.',
    },
    disclaimer: {
      title: 'Faqat tadqiqot maqsadlarida foydalanish uchun',
      text: 'Ushbu vosita qaror qabul qilishni qo\'llab-quvvatlash tizimi bo\'lib, professional tibbiy maslahat o\'rnini bosa olmaydi. Barcha topilmalar malakali tibbiyot mutaxassisi tomonidan tasdiqlanishi kerak.',
    },
    loader: {
      title: 'Tahlil bajarilmoqda',
      message1: 'SI modeli ishga tushirilmoqda...',
      message2: 'Rasm ma\'lumotlari qayta ishlanmoqda...',
      message3: 'Asosiy xususiyatlar aniqlanmoqda...',
      message4: 'Ishonch ballari sozlanmoqda...',
      message5: 'Klinik ma\'lumotlar bilan solishtirilmoqda...',
      message6: 'Yakuniy hisobot yaratilmoqda...',
    },
    feedback: {
      title: 'Ushbu tahlil foydali bo\'ldimi?',
      accurate: 'Aniq',
      inaccurate: 'Noaniq',
      commentPlaceholder: 'Qo\'shimcha fikr-mulohaza bildiring (ixtiyoriy)',
      submit: 'Fikrni yuborish',
    },
    history: {
        title: 'Tahlillar tarixi',
        subtitle: 'O\'tgan tahlillar va hisobotlarni ko\'rib chiqing.',
        empty: 'Tarix topilmadi. Uni bu yerda ko\'rish uchun tahlil bajaring.',
        viewReport: 'Hisobotni ko\'rish',
        delete: 'O\'chirish',
        deleteConfirm: 'Haqiqatan ham ushbu tahlilni oʻchirib tashlamoqchimisiz?',
        patient: 'Bemor',
        date: 'Sana',
    },
    controls: {
        save: 'Tarixga saqlash',
        saved: 'Saqlandi',
        exportPdf: 'PDF sifatida eksport',
        newPatient: 'Yangi bemor',
    }
  },
};