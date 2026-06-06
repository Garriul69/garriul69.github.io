---
title: "Organización de seguridad de cuentas AWS"
description: "GuardDuty, AWS Config, Security Hub y Firewall Manager explicados."
date: 2023-08-17
tags: ["aws","seguridad","guardduty"]
---

### ¿Qué es GuardDuty?

Amazon GuardDuty es un servicio de detección de amenazas gestionado por AWS que está diseñado para proteger tus recursos en la nube contra una variedad de ataques y actividades sospechosas. Algunos ejemplos de los tipos de ataques y actividades que GuardDuty puede detectar incluyen:

1. **Acceso no autorizado**: Detecta intentos de acceso no autorizados a tus recursos, como intentos de inicio de sesión desde ubicaciones inusuales o direcciones IP sospechosas.
    
2. **Infiltración de malware y botnets**: Identifica patrones de tráfico y comportamientos que pueden indicar la presencia de malware o botnets en tus instancias y redes.
    
3. **Comportamiento de ataque de fuerza bruta**: Detecta patrones de intentos repetidos y rápidos de inicio de sesión que podrían indicar ataques de fuerza bruta para obtener acceso no autorizado.
    
4. **Tráfico de comandos y control**: Vigila la comunicación entre tus instancias y direcciones IP maliciosas asociadas con servidores de comando y control de malware.
    
5. **Escaneo de vulnerabilidades**: Identifica actividades de escaneo que buscan vulnerabilidades en tus recursos y posibles intentos de explotar esas vulnerabilidades.
    
6. **Exfiltración de datos**: Monitorea la transferencia inusual de datos desde tus instancias a ubicaciones externas, lo que podría ser un indicador de intentos de exfiltración de datos.
    
7. **Actividades de minería de criptomonedas no autorizadas**: Detecta el uso no autorizado de recursos de cómputo para actividades de minería de criptomonedas, lo que podría afectar el rendimiento de tus instancias.
    
8. **Cambios en la configuración de la cuenta**: Identifica cambios en las configuraciones de tu cuenta de AWS que podrían ser indicativos de actividad maliciosa o cambios no autorizados.
    
9. **Acceso a credenciales filtradas**: Detecta intentos de uso de credenciales de seguridad filtradas o robadas.
    

Es importante tener en cuenta que Amazon GuardDuty no solo detecta estas actividades, sino que también proporciona alertas y detalles para que puedas tomar medidas rápidas y mitigar las posibles amenazas. Ayuda a brindar una capa adicional de seguridad a tus recursos en la nube al monitorear constantemente y alertarte sobre comportamientos anómalos y sospechosos.

### ¿Qué es AWS Config?

Imagina que Amazon Web Services (AWS) es como un enorme conjunto de piezas de LEGO, cada una representa un servicio que puedes usar para construir cosas en la nube, como sitios web, aplicaciones, almacenamiento de datos, etc.

Ahora, el servicio llamado "AWS Config" es un tipo especial de LEGO que te ayuda a mantener un ojo en todo lo que está sucediendo con tus otras piezas de LEGO (los servicios de AWS) después de que los hayas ensamblado.

Funciona como un espía que está siempre observando lo que haces con tus LEGOs y anota todos los cambios que haces. Por ejemplo, si construyes un nuevo servidor o cambias la configuración de seguridad de tu sitio web, AWS Config toma nota de eso y registra la información.

¿Por qué es útil? Bueno, imagina que tienes muchos LEGO construidos y de repente te das cuenta de que algo está mal o que alguien movió una pieza sin que te des cuenta. AWS Config te ayuda a descubrir qué pasó, qué cambios se hicieron y quién los hizo. También puede ayudarte a seguir prácticas de seguridad, asegurándote de que todas las piezas estén configuradas correctamente y que nadie haya hecho algo que pudiera afectar la seguridad o el funcionamiento de tus construcciones en la nube.

En resumen, AWS Config es como tu asistente personal de seguridad y monitoreo en AWS, siempre atento para asegurarse de que todo esté en orden y dándote pistas sobre lo que está sucediendo con tus creaciones en la nube.

### ¿Qué es Security Hub?

Imagina que Amazon Web Services (AWS) es como un gran centro comercial en línea, donde puedes encontrar todo tipo de tiendas y servicios para construir tu presencia en internet, como sitios web y aplicaciones.

Ahora, "AWS Security Hub" es como el centro de seguridad de ese gran centro comercial. Es el lugar donde puedes ir para ver cómo están protegidos tus negocios y recursos en AWS. Imagina que tienes varias tiendas en ese centro comercial y quieres asegurarte de que todas estén seguras y bien protegidas.

Cuando entras en AWS Security Hub, puedes ver un tablero que te muestra si hay problemas de seguridad en tus tiendas. Por ejemplo, si alguien intentó entrar a tus tiendas sin permiso o si hay problemas de configuración que podrían causar problemas. Además, AWS Security Hub te dice qué debes hacer para solucionar esos problemas y cómo mejorar la seguridad de tus recursos.

Es como si tuvieras un equipo de seguridad que te avisa si hay algo raro en tus tiendas y te da consejos sobre cómo protegerlas mejor. Esto te ayuda a mantener tus tiendas en línea seguras y protegidas de posibles problemas, para que puedas centrarte en hacer crecer tu negocio sin preocuparte por la seguridad.

En resumen, AWS Security Hub es como tu propio equipo de seguridad en AWS, que te ayuda a mantener tus recursos seguros y te da consejos para mejorar la protección de tu presencia en línea.

---

AWS Security Hub es un servicio de seguridad gestionado por Amazon Web Services (AWS) que te permite centralizar y automatizar el monitoreo de la seguridad de tus recursos en la nube. Es un servicio diseñado para ayudarte a identificar y gestionar de manera eficiente posibles problemas de seguridad en tu entorno de AWS.

En lugar de revisar manualmente múltiples paneles y registros de diferentes servicios de seguridad, AWS Security Hub agrega y normaliza automáticamente los hallazgos de seguridad de varios servicios de AWS y socios de seguridad. Esto te proporciona una vista unificada de la seguridad de tus recursos, lo que facilita la identificación de problemas y la toma de decisiones informadas para mejorar tu postura de seguridad.

Las características principales de AWS Security Hub incluyen:

1. **Agregación de Hallazgos**: Recopila y agrega hallazgos de seguridad de servicios de AWS, como Amazon GuardDuty, Amazon Inspector y AWS Config, así como de soluciones de socios de seguridad.
    
2. **Priorización Automatizada**: Clasifica automáticamente los hallazgos de seguridad en niveles de gravedad y te proporciona recomendaciones de acción para abordar los problemas.
    
3. **Integración con Ecosistema**: Se integra con otras herramientas y servicios de seguridad, lo que te permite automatizar respuestas y mitigación de problemas.
    
4. **Paneles y Visualizaciones**: Ofrece paneles y visualizaciones intuitivos para que puedas evaluar rápidamente el estado de seguridad de tus recursos y tomar medidas.
    
5. **Notificaciones y Alertas**: Te permite configurar notificaciones y alertas para recibir información sobre hallazgos de seguridad y cambios en tu entorno.
    
6. **Cumplimiento y Estandarización**: Ayuda a evaluar el cumplimiento de tus recursos con estándares y regulaciones de seguridad específicos.

### ¿Que es firewall manager?

AWS Firewall Manager es un servicio de administración de seguridad proporcionado por Amazon Web Services (AWS) que te permite centralizar y automatizar la administración de políticas de seguridad de tus recursos en la nube. En lugar de configurar manualmente reglas de seguridad en diferentes servicios de AWS, AWS Firewall Manager te permite definir y aplicar políticas de seguridad coherentes en varios recursos en toda tu organización.

Las características clave de AWS Firewall Manager son:

1. **Centralización de Políticas**: Te permite definir y administrar reglas de seguridad, como reglas de firewall, listas de control de acceso (ACLs) y políticas de seguridad, en un solo lugar. Estas políticas se pueden aplicar de manera consistente en múltiples cuentas de AWS y regiones.
    
2. **Cumplimiento y Control**: Ayuda a asegurarte de que tus recursos cumplan con los estándares y políticas de seguridad establecidos por tu organización. Esto es particularmente útil en entornos empresariales con múltiples equipos y proyectos.
    
3. **Automatización y Coherencia**: Facilita la automatización de la implementación de políticas de seguridad en nuevos recursos a medida que se crean. Esto garantiza la coherencia en la aplicación de reglas de seguridad en todo tu entorno.
    
4. **Integración con WAF y Shield**: Puedes integrar AWS Firewall Manager con Amazon Web Application Firewall (WAF) y AWS Shield para proteger tus aplicaciones web y recursos contra ataques y amenazas.
    
5. **Auditoría y Monitoreo**: Proporciona visibilidad y monitoreo centralizados de las políticas de seguridad implementadas en tus recursos. Puedes ver informes y registros de actividad para evaluar el cumplimiento y detectar posibles problemas.
    
6. **Administración de Reglas de Seguridad AWS Orgs**: Si estás utilizando AWS Organizations para administrar múltiples cuentas, AWS Firewall Manager te permite implementar y administrar reglas de seguridad a nivel de la organización.
    

AWS Firewall Manager simplifica y mejora la administración de la seguridad en tu entorno de AWS al permitirte definir, aplicar y monitorear políticas de seguridad coherentes en toda tu organización. Esto ayuda a fortalecer la protección de tus recursos y datos en la nube y a mantener un alto nivel de seguridad.
