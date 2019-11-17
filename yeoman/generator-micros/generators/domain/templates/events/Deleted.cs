using Newtonsoft.Json;
using System;

namespace <%=namespace%>.domain.<%= changeCase.pascalCase(name)%>s.Messages.Events
{
    public class <%= changeCase.pascalCase(name)%>Deleted:<%= changeCase.pascalCase(name)%>BaseEvent
    {

        public Guid Id { get; }

        public <%= changeCase.pascalCase(name)%>Deleted(Guid id)
        {
            Id = id;
        }
    }
}
