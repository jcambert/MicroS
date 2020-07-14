using System;<%if(mongo){%>
using MicroS_Common.Mongo;<%}%>
<%- include('./../../common/templates/using') %>
<%if(entity){%>using MicroS_Common.Types;<%}%>

/// <summary>
/// This file was generated by the yeoman generator "generator-micros"
/// @author: <%=author.name%>
/// @email: <%=author.email%>
/// @created_on: <%= new Date()%>
/// </summary>
namespace <%=appname%>.domain.<%= domain %>s.Domain
{
    <%if(mongo){%>[MongoDocument("<%= domain %>")]<%}%>
    public partial class <%= pascalDomain %> <%if(entity){%> :BaseEntity<%}%>
    {
        #region private variables
        <%- include('./../../common/templates/privateNonPrimitiveVar') %>
        
        #endregion


        #region public properties
         <%- include('./../../common/templates/props') %>
         
        #endregion

        #region Constructeur
        public <%= pascalDomain %>():base(){}
        <%if(subdoc){%>
        public <%= pascalDomain %>(<%- include('./../../common/templates/ctorPrimitiveOnly') %>)
        : base()
        {
            <%- include('./../../common/templates/ctorsetpropsPrimitiveOnly') %>
        }
        <%}else{%>
        public <%= pascalDomain %>(<%- include('./../../common/templates/ctorPrimitiveOnly') %>)
            : base()
        {
            <%- include('./../../common/templates/ctorsetpropsPrimitiveOnly') %>
        }
        <%}%>
        #endregion
        #region public functions
        #endregion

    }
}
