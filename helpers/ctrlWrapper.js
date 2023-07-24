const ctrlWrapper = (ctrl) => {
  const func = async (req, res, next) => {
    try {
      await ctrl(req, res, next);
    } catch (error) {
      console.error("Ошибка в контроллере:", error);
      res.status(500).json({
        error: "Ошибка сервера",
      });
    }
  };
  return func;
};

module.exports = ctrlWrapper;
