using MicroS_Common.Types;
using System;
using <%=namespace%>.domain.<%= changeCase.titleCase(name)%>s.Dto;

namespace <%=namespace%>.domain.<%= changeCase.titleCase(name)%>s.Queries
{
    public class Get<%= changeCase.titleCase(name)%> : IQuery<<%= changeCase.titleCase(name)%>Dto>
    {
        public Guid Id { get; set; }
    }
}
