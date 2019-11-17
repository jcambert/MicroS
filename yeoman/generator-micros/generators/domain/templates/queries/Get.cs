using MicroS_Common.Types;
using System;
using <%=namespace%>.domain.<%= changeCase.pascalCase(name)%>s.Dto;

namespace <%=namespace%>.domain.<%= changeCase.pascalCase(name)%>s.Queries
{
    public class Get<%= changeCase.pascalCase(name)%> : IQuery<<%= changeCase.pascalCase(name)%>Dto>
    {
        #region public properties
        <%if(base_entity){%>
            public Guid Id { get; set; }
        <% } %>
        #endregion
        
    }
}
