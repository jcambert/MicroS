using System;

namespace <%=namespace%>.domain.<%= changeCase.titleCase(name) %>s.Dto
{
    public class <%= changeCase.titleCase(name) %>Dto
    {


        #region public properties
         public Guid Id { get; set; }
        <% props.forEach(property=> { %>
        public <%= property.type %> <%= changeCase.titleCase( property.name) %>  {get;set;}
        <% } )%>
        #endregion


    }
}
