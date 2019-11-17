using System;

namespace <%=namespace%>.domain.<%= changeCase.pascalCase(name) %>s.Dto
{
    public class <%= changeCase.pascalCase(name) %>Dto
    {


        #region public properties
        <%if(base_entity){%>
         public Guid Id { get; set; }
        <%}%>
        <% props.forEach(property=> { %>
        public <%= property.type %> <%= changeCase.pascalCase( property.name) %>  {get;set;}
        <% } )%>
        #endregion


    }
}
