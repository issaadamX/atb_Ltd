const notificationController = {
  getAllNotifications: async (req, res) => {
    try {
      const mockNotifications = [
        {
          id: 1,
          type: 'appointment',
          title: 'New Appointment',
          message: 'New appointment request from John Doe',
          isRead: false,
          createdAt: new Date().toISOString()
        }
      ];

      res.json({
        success: true,
        data: mockNotifications
      });
    } catch (error) {
      res.status(500).json({
        success: false,
        message: 'Failed to fetch notifications'
      });
    }
  },

  getUnreadCount: async (req, res) => {
    try {
      res.json({
        success: true,
        data: { count: 3 }
      });
    } catch (error) {
      res.status(500).json({
        success: false,
        message: 'Failed to get unread count'
      });
    }
  },

  markAsRead: async (req, res) => {
    try {
      res.json({
        success: true,
        message: 'Notification marked as read'
      });
    } catch (error) {
      res.status(500).json({
        success: false,
        message: 'Failed to mark notification as read'
      });
    }
  },

  markAllAsRead: async (req, res) => {
    try {
      res.json({
        success: true,
        message: 'All notifications marked as read'
      });
    } catch (error) {
      res.status(500).json({
        success: false,
        message: 'Failed to mark all notifications as read'
      });
    }
  },

  deleteNotification: async (req, res) => {
    try {
      res.json({
        success: true,
        message: 'Notification deleted successfully'
      });
    } catch (error) {
      res.status(500).json({
        success: false,
        message: 'Failed to delete notification'
      });
    }
  }
};

module.exports = notificationController;