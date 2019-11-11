using AutoMapper;
using MicroS_Common.Handlers;
using MicroS_Common.RabbitMq;
using MicroS_Common.Types;
using System.Threading.Tasks;
using <%=namespace%>.domain.<%= changeCase.titleCase(name) %>s.Domain;
using <%=namespace%>.domain.<%= changeCase.titleCase(name) %>s.Messages.Commands;
using <%=namespace%>.domain.<%= changeCase.titleCase(name) %>s.Messages.Events;
using <%=namespace%>.Services.<%= changeCase.titleCase(name) %>s.Repositories;

/// <summary>
/// @author: <%=author.name%>
/// @email: <%=author.email%>
/// @created_on: <%= new Date()%>
/// </summary>
namespace <%=namespace%>.Services.<%= changeCase.titleCase(name) %>s.Handlers
{
    /// <summary>
    /// Delete <%= changeCase.titleCase(name) %> Handler
    /// </summary>
    public partial class Create<%= changeCase.titleCase(name) %>Handler : DomainCommandHandler<Create<%= changeCase.titleCase(name) %>,<%= changeCase.titleCase(name) %>>
    {
        

        #region Constructors
        public Create<%= changeCase.titleCase(name) %>Handler(
            I<%= changeCase.titleCase(name) %>sRepository <%= changeCase.lowerCase(name) %>Repository,
            IBusPublisher busPublisher,
            IMapper mapper):base(busPublisher,mapper,<%= changeCase.lowerCase(name) %>Repository)
        {
        }
        #endregion

        #region Protected Overrides functions
        /// <summary>
        /// Check if the model exist by Command
        /// </summary>
        /// <param name="command">The command in wich information can be use do check if the model exist in database</param>
        /// <returns>Nothing</returns>
        protected override async Task CheckExist(Create<%= changeCase.titleCase(name) %> command)
        {
            if (await (Repository as I<%= changeCase.titleCase(name) %>sRepository).ExistsAsync(command.Name))
            {
                throw new MicroSException("<%= changeCase.lowerCase(name) %>_already_exists",$"<%= changeCase.titleCase(name) %>: '{command.Name}' already exists.");
            }
           
        }
        #endregion

        #region Public Overrides functions
        /// <summary>
        ///  Handle the command with context
        /// </summary>
        /// <param name="command">The command to handle</param>
        /// <param name="context">The correlation context</param>
        /// <returns></returns>
        public override async Task HandleAsync(Create<%= changeCase.titleCase(name) %> command, ICorrelationContext context)
        {

            await base.HandleAsync(command, context);

            var product = GetDomainObject(command);
            
            await Repository.AddAsync(product);

            await BusPublisher.PublishAsync(CreateEvent<<%= changeCase.titleCase(name) %>Created>(command), context);
        }
        #endregion
    }
}
