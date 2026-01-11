const settingsController = {
  getSettings: async (req, res) => {
    try {
      const mockSettings = {
        siteName: 'ATB Ltd',
        siteDescription: 'Professional construction and engineering services',
        contactEmail: 'info@atbltd.com',
        contactPhone: '+1234567890',
        address: '123 Main Street, City, Country',
        socialLinks: {
          facebook: 'https://facebook.com/atbltd',
          twitter: 'https://twitter.com/atbltd',
          linkedin: 'https://linkedin.com/company/atbltd',
          instagram: 'https://instagram.com/atbltd'
        },
        bookingEnabled: true,
        maxAppointmentsPerDay: 5,
        emailNotifications: true,
        smsNotifications: false
      };

      res.json({
        success: true,
        data: mockSettings
      });
    } catch (error) {
      res.status(500).json({
        success: false,
        message: 'Failed to fetch settings'
      });
    }
  },

  updateSettings: async (req, res) => {
    try {
      res.json({
        success: true,
        message: 'Settings updated successfully'
      });
    } catch (error) {
      res.status(500).json({
        success: false,
        message: 'Failed to update settings'
      });
    }
  }
};

module.exports = settingsController;