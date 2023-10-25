Tercera entrega:
Nuevos permisos de usuario premium/admin:
Perfil del usuario- 
      1.Archivos handlebars: 
      -home.handlebars - btn UIQERO SER USUARIO PREMIUM- Lleva a /api/session/convertToPremium (archivo session.router.js y session.controllers.js)
         Si sos premium: 
         -profile.handlebars -endpoint de la vista '/profile' (archivo login.view.router.js)
         - newProduct.handlebars (form para agregar producto) endpoint de la vista '/products/newproduct' (archivo products.view.router.js)
         - userProducts.handlebars (liste de productos del usuario con boton de eliminar producto)

      -home.handlebars - btn DEJAR DE SER USUARIO PREMIUM- Leeva a api/session/revertPremium (archivo session.router.js y session.controllers.js)
     
      2.Logicas        
       -"Crear nuevo producto": '/products/newProduct' ( products.controllers, método postProduct)
       -"Que el user premium no pueda agregar su propio producto"- (products.controllers, método addProductToCArt)


                           MAIL SERVICES
Carpeta mailServices - archivo mail.service.js:  class MailingService
Carpeta constants:
         -Archivo Dtemplates.js: diccionario de templates.
         -Archivo DMailInfo.js: diccionario de info de correos. 
Archivo utils.js: función generateMailTemplate.
Carpeta templates- archivo restorePassw.handlebars             
Carpeta routers- archivo email.router.js                   
                           
                           
                           SERVICES:
Carpeta services- archivo services.js : instancias de clases (services)                             
                             
                             
                             ERRORS:
Carpeta meddlewares - archivo error.meddleware.js : errorHandler que se usa a nivel aplicación.
Carpeta services - carpeta ErrorServices- archivo error.services.js : class ErrorService                                          
Carpeta constans: 
        - archivo EErrors.js : diccionarios
        -productErrors: functions asociada a products errors
Carpeta controlles:
        -archivo products.controllers.js : addProductToCart - postProduct


                             LOGGER CON WINSTON:

 Carpeta services - archivo logger.sevice.js : Clase, incio logger. 
 Carpeta meddlewares - archivo logger.meddleware.js : Meddleware, genero req.logger
 Carpeta src - archivo app.js : utilizo el meddleware a nivel aplicacion. 
 Carpera routers- archivo routers.js- metodo handlePolicies : utilizo req.loggers si: 
    -llega el token y user: logger.info / 
    -si no llega token y user : logger.error
 Carpeta controllers- archivo productControllers.js - método addProductToCart:
    -Producto sin stock: req.logger.error
Carpeta controllers- archivo sessionControllers.js - métodos registerUser,loginUser:
    -Error de registro o login (usuarios no encontrados): req.logger.error

 Carpeta routers- carpeta loggerRouter- archivo logger.router.js : router.get('/loggerTest') 

